import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { UserDao, PhotoDao } from '@daos';
import multer from 'multer';
import * as fs from 'fs'
import {logger, getEmail, APIMW } from '@shared';
import { NextFunction } from 'express-serve-static-core';
import { Photo, IPhoto } from '@entities';
import { Path } from '../helper/Path';
import { get as gets } from 'https';
import { env } from 'process';

const axios = require('axios')
const upload = multer() // for parsing multipart/form-data
const router = Router();
const photoDao = new PhotoDao();
const userDao = new UserDao();
var cpUpload = upload.fields([{ name: 'file', maxCount: 8 }, { name: 'path', maxCount: 1 }])
router.post('/detection', APIMW,cpUpload, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files:any  = req.files;
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
            console.log(files[key][0])
            var photo:IPhoto = new Photo(files[key][0].originalname,user)
            if(!fs.existsSync("../picture"))
            {
                fs.mkdirSync("../picture")
            }
            fs.writeFileSync( Path.getPath(photo.filename), files[key][0].buffer)
            var result = await axios.post("http://"+ env.PyDetect + "/hooks", Path.getPath(photo.filename)  )
            //var result = child.execSync("python3 ../Detection/single_image_detection.py " + Path.getPath(photo.filename));
            hasMask = parseInt(result.toString()) == 0;
            console.log(result.toString())
            await photoDao.add(photo)
        }
        if(!hasMask){
            var url = 'https://api.telegram.org/bot'+ env.TelegramToken + '/sendMessage?chat_id=' + user?.chatID + "&text=Achtung eine Person ohne Maske ist eingedrungen!!!";
            gets(url)
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
