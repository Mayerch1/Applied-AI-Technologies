import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { UserDao, PhotoDao } from '@daos';
import multer from 'multer';
import * as fs from 'fs'
import {logger, getEmail, APIMW } from '@shared';
import { NextFunction } from 'express-serve-static-core';
import { Photo, IPhoto } from '@entities';
import { Path } from '../helper/Path';
import { env } from 'process';
import TelegramBot from 'node-telegram-bot-api';
import { PackageHandler } from '../helper/Package';


const bot = new TelegramBot(env.TelegramToken??'')
const axios = require('axios')
const upload = multer() // for parsing multipart/form-data
const router = Router();
const photoDao = new PhotoDao();
const userDao = new UserDao();
var cpUpload = upload.fields([{ name: 'file', maxCount: 8 }, { name: 'path', maxCount: 1 }])
router.post('/detection', APIMW,cpUpload, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files:any = req.files;
        if(!files)
        {
            return res.status(BAD_REQUEST).json({
                error: "No File Uploaded",
            });
        }

        var key:string
        var email:string =   await getEmail(req);
        var user =  await userDao.getOne(email)


        var hasMask: boolean = false
        for (key in files) {
            if (!user){
                return res.status(BAD_REQUEST).json({
                    error: "Invalid User",
                });
            }

            user = PackageHandler.checkAvaiblePictures(user);
            if (user.leftPictures < 0)
            {
                return res.status(BAD_REQUEST).json({
                    error: "Rate Limit",
                });
            }

            console.log(files[key][0])
            var photo:IPhoto = new Photo(files[key][0].originalname,user)
            if(!fs.existsSync("../picture"))
            {
                fs.mkdirSync("../picture")
            }
            fs.writeFileSync( Path.getPath(photo.filename), files[key][0].buffer)
            //var result = await axios.post("http://"+ env.PyDetect + "/hooks", Path.getPath(photo.filename)  )
            //hasMask = parseInt(result.data.toString()) == 0;
            //hasMask = false;
            photo.result = false;
            await photoDao.add(photo);
            userDao.updateLeftPictures(email, user.date, user.leftPictures - 1);
            if(!hasMask)
            {
                if(user && user?.chatID != "" && user?.chatID != "0")
                {
                    bot.sendPhoto(user?.chatID, files[key][0].buffer, {caption: "Attention! A person without a mask has entered!!!"})
                }
            }
        }

        
        return res.status(OK).json({mask: hasMask}).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
