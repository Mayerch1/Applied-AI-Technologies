import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { UserDao } from '@daos';
import { paramMissingError, logger, adminMW, userMW, getEmail } from '@shared';
import { UserRoles } from '@entities';
import { v4 as uuid } from 'uuid';
import { env } from 'process';
import TelegramBot from 'node-telegram-bot-api'

interface Dictionary<T> {
    [Key: string]: T;
}

// Init shared
const router = Router();
const userDao = new UserDao();
const bot = new TelegramBot(env.TelegramToken??'')
var TelegramTokenDic: Dictionary<string> = {}

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', adminMW, async (req: Request, res: Response) => {
    try {
        const users = await userDao.getAll();
        return res.status(OK).json({users});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get Current User - "GET /api/users/get"
 ******************************************************************************/

router.get('/get', userMW, async (req: Request, res: Response) => {
    try {
        var email:string = await getEmail(req);
        const users = await userDao.getOne(email);
        var telegramurl: string = "";
        if (users?.id){
            TelegramTokenDic[users?.id] = Buffer.from(uuid().toLowerCase().replace('-', ''), "ascii").toString("base64");
            telegramurl = "https://t.me/" + env.TelegramBotId + "?start=" +  TelegramTokenDic[users?.id];
        }


        return res.status(OK).json({email: users?.email,
                                    name: users?.name, 
                                    surname: users?.surname,
                                    chatID: users?.chatID,
                                    apiToken: users?.apiToken, 
                                    telegramUrl: telegramurl});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

if(env.TelegramWebHook)
 {
    //telegram Webhook
    router.post('/' + env.TelegramWebHook, async (req: Request, res: Response) => {
        try {
            var updates:TelegramBot.Update[];
            //debug
            if (env.HOST == 'localhost' || env.HOST == '127.0.0.1')
            {
               updates = await bot.getUpdates();

            }
            else{
                updates = req.body
            }
            // production
            console.log(updates);
            for(var updateobject of updates)
            {
                var token = updateobject.message?.text;
                if(updateobject.message?.text?.includes('/start'))
                {
                    token = token?.replace('/start ', '');
                    for (var key in TelegramTokenDic ){
                        if(token && TelegramTokenDic[key].includes(token)){
                            var user = await userDao.getOne(parseInt(key));
                            if (user){
                                user.chatID = updateobject.message?.chat.id?.toString() || '';
                                userDao.update(user);
                                return res.status(OK).json({
                                    info: "user verbunden",
                                });
                        
                            }
                        }
                    }
                }
            }

            return res.status(OK).json({
                info: "passt nicht",
            });

        } catch (err) {
            logger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    });

    if (!(env.HOST === 'localhost' || env.HOST === '127.0.0.1'))
    {
        if(bot.hasOpenWebHook() )
        {
            bot.deleteWebHook();
        }
    
        bot.setWebHook("https://" + env.HOST + "/api/users/" + env.TelegramWebHook)

        if(!bot.hasOpenWebHook() )
        {
            throw new Error("Webhook not Working")
        }
    }
 

 }
 else{
     throw new Error("TelegramWebhook Enviroment Parameter is missing")
 }

/******************************************************************************
 *                      Get All Users - "GET /api/users/NewApiToken"
 ******************************************************************************/

router.get('/NewApiToken', userMW, async (req: Request, res: Response) => {
    try {
        var email:string = await getEmail(req);
        const user = await userDao.getOne(email);
        if(!user){
            throw new Error("User Not LoggedIn");
        }
        user.apiToken =  Buffer.from(uuid().toLowerCase().replace('-', ''), "ascii").toString("base64");
        await userDao.update(user);
        return res.status(OK).json({apiToken: user.apiToken });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});



/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', adminMW, async (req: Request, res: Response) => {
    try {
        // Check parameters
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        // Add new user
        user.role = UserRoles.Standard;
        await userDao.add(user);
        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', adminMW, async (req: Request, res: Response) => {
    try {
        // Check Parameters
        const user = req.body;
        var email:string = await getEmail(req);
        const userDatabase = await userDao.getOne(email);
        user.email = email;
        user.apiToken = userDatabase?.apiToken;

        if (req.body.PasswordConfirm !== req.body.Password){
            throw new Error("Password not invalid");
        }
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        // Update user
        user.id = Number(userDatabase?.id);
        await userDao.update(user);
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', adminMW, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await userDao.delete(Number(id));
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
