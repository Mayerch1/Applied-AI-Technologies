import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { UserDao, PhotoDao } from '@daos';
import multer from 'multer';
import * as fs from 'fs'
import {logger, userMW,  getEmail, APIMW } from '@shared';
import { NextFunction } from 'express-serve-static-core';
import { Photo, IPhoto } from '@entities';
import { Path } from '../helper/Path';
import * as child from 'child_process';
import { get } from 'https';
import { env } from 'process';

const upload = multer() // for parsing multipart/form-data
const router = Router();
const photoDao = new PhotoDao();
const userDao = new UserDao();
var cpUpload = upload.fields([{ name: 'file', maxCount: 8 }, { name: 'path', maxCount: 1 }])
router.post('/detection', APIMW,cpUpload, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files:any  = req.files;
        var key:string
        var email:string =   await getEmail(req);
        var user =  await userDao.getOne(email)
        var hasMask: boolean = false
        for (key in files) {
            console.log(files[key][0])
            var photo:IPhoto = new Photo(files[key][0].originalname,user)
            fs.writeFileSync( Path.getPath(photo.filename), files[key][0].buffer)
            var result = child.execSync("python3 ../Detection/single_image_detection.py " + Path.getPath(photo.filename));
            hasMask = parseInt(result.toString()) == 0;
            console.log(result.toString())
            await photoDao.add(photo)
        }
        if(!hasMask){
            var url = 'https://api.telegram.org/bot'+ env.TelegramToken + '/sendMessage?chat_id=' + user?.chatID + "&text=Achtung eine Person ohne Maske ist eingedrungen!!!";
            get(url)
        }

        
        return res.status(OK).json({mask: hasMask}).end();
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
