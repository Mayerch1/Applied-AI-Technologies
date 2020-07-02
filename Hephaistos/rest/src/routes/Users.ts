import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { UserDao, PhotoDao } from '@daos';
import { paramMissingError, logger, adminMW, userMW, getEmail } from '@shared';
import { UserRoles, IUser } from '@entities';
import { v4 as uuid } from 'uuid';
import { env } from 'process';
import TelegramBot from 'node-telegram-bot-api';

interface Dictionary<T> {
    [Key: string]: T;
}

// Init shared
const router = Router();
const userDao = new UserDao();
const photoDao = new PhotoDao();
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
                                    packageId: users?.packageId, 
                                    telegramUrl: telegramurl});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

async function ConnectUser(obj:TelegramBot.Update,  res: Response) {
    var token = obj.message?.text;
    var chatID;
    if(obj.message?.text?.includes('/revoke'))
    {
        chatID = obj.message?.chat.id?.toString() || '';
        try {
        await photoDao.revokeLastByChatId(chatID);
        bot.sendMessage(chatID, "The result of the last image was marked as incorrect. Thank You :)")
        } catch (error) {
            bot.sendMessage(chatID, "No Picture found to revoke. :(" )
            
        }
    }
    else if(obj.message?.text?.includes('/start'))
    {
        token = token?.replace('/start ', '');
        for (var key in TelegramTokenDic ){
            if (token && TelegramTokenDic[key].includes(token)){
                var userId = parseInt(key);
                if (userId){
                    chatID = obj.message?.chat.id?.toString() || '';
                    await userDao.updateChatId(userId, chatID);
                    if(chatID != "0")
                    {
                       await bot.sendPhoto(chatID, "../res/logo.png", {caption: "Welcome to Hephaistos! Your user account was successfully connected with Telegram. If the result is wrong please type /revoke. We will learn from it."})
                    }
                    return;
                }
            }
        }
    }
}

if(env.TelegramWebHook)
 {
    //telegram Webhook
    router.post('/' + env.TelegramWebHook, async (req: Request, res: Response) => {
        try {
            //debug
            if (env.HOST == 'localhost' || env.HOST == '127.0.0.1')
            {
               var updates = await bot.getUpdates();
               for(var updateobject of updates)
               {
                  ConnectUser(updateobject, res);
               }
            }
            else{
                updateobject = req.body;
                // production
                ConnectUser(updateobject, res)
            }

            return res.status(OK).json({});
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
            //throw new Error("Webhook not Working")
        }
    }
 }
 else{
     throw new Error("TelegramWebhook Enviroment Parameter is missing")
 }

/******************************************************************************
 *                      Create new ApiToken - "GET /api/users/NewApiToken"
 ******************************************************************************/

router.get('/NewApiToken', userMW, async (req: Request, res: Response) => {
    try {
        var email:string = await getEmail(req);
        var apiToken =  Buffer.from(uuid().toLowerCase().replace('-', ''), "ascii").toString("base64");
        await userDao.updateApiToken(email, apiToken);
        return res.status(OK).json({apiToken: apiToken });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Delete ChatID - "Delete /api/users/ChatId"
 ******************************************************************************/

router.delete('/ChatId', userMW, async (req: Request, res: Response) => {
    try {
        var email:string = await getEmail(req);
        await userDao.updateChatId(email, "");
        return res.status(OK).json({});
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

router.put('/updatePackage', userMW, async (req: Request, res: Response) => {
    try {
        // Check Parameters
        const pack: {packageId:number} = req.body;
        if (!pack)
        {
            return res.status(BAD_REQUEST).json({});
        }
        var email:string = await getEmail(req);

        await userDao.updatePackage(email, pack.packageId);
        return res.status(OK).end();
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

router.put('/update', userMW, async (req: Request, res: Response) => {
    try {
        // Check Parameters
        const user: IUser = req.body;
        var email:string = await getEmail(req);

        await userDao.update(email, user.surname, user.name);
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Update - "PUT /api/users/changePassword"
 ******************************************************************************/

router.put('/changePassword', userMW, async (req: Request, res: Response) => {
    try {
        // Check Parameters
        var email:string = await getEmail(req);
        var password: string;

        if (req.body.password.length > 0 && req.body.passwordConfirm === req.body.password)
        {
            password =  req.body.password;
        }
        else {
            return res.status(BAD_REQUEST).json({
                info: "Password not conform",
            });
        }
        await userDao.changePassword(email, password);
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
