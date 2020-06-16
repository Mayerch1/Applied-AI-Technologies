import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import { UserDao, PhotoDao } from '@daos';
import multer from 'multer';
import * as fs from 'fs'
import {logger, userMW,  getEmail, APIMW } from '@shared';
import { NextFunction } from 'express-serve-static-core';
import { Photo, IPhoto } from '../entities/Photo';
import { Path } from '../helper/Path';
import * as child from 'child_process';

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
        var hasMask: boolean = false
        for (key in files) {
            console.log(files[key][0])
            var photo:IPhoto = new Photo(files[key][0].originalname,await userDao.getOne(email))
            fs.writeFileSync( Path.getPath(photo.filename), files[key][0].buffer)
            var result = child.execSync("python3 ../../Hephaistos/Detection/single_image_detection.py " + Path.getPath(photo.filename));
            hasMask = parseInt(result.toString()) == 0;
            console.log(result.toString())
            await photoDao.add(photo)
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
