import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { UserDao } from '@daos';
import { paramMissingError, logger, adminMW, userMW, getEmail } from '@shared';
import { UserRoles } from '../entities/User';
import { v4 as uuid } from 'uuid';

// Init shared
const router = Router();
const userDao = new UserDao();


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
 *                      Get All Users - "GET /api/users/get"
 ******************************************************************************/

router.get('/get', userMW, async (req: Request, res: Response) => {
    try {
        var email:string = await getEmail(req);
        const users = await userDao.getOne(email);
        return res.status(OK).json({email: users?.email,
                                    name: users?.name, 
                                    surname: users?.surname,
                                    chatID: users?.chatID,
                                    apiToken: users?.apiToken });
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

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
        const { id } = req.params as ParamsDictionary;
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
