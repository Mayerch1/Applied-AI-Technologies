import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { UserRoles } from '@entities';
import { logger } from './Logger';
import { jwtCookieProps } from './cookies';
import { JwtService } from './JwtService';
import { UserDao } from '@daos';
const userDao = new UserDao();


// Init shared
const jwtService = new JwtService();

// Strings
export const paramMissingError = 'One or more of the required parameters was missing.';
export const loginFailedErr = 'Login failed';

// Numbers
export const pwdSaltRounds = 12;



/* Functions */

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};


export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};


// Middleware to verify if user is an admin
export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[jwtCookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Admin) {
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};




// Middleware to verify if user is an admin
export const userMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[jwtCookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Standard||clientData.role === UserRoles.Admin) {
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};


// Middleware to verify if user is an admin
export const APIMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        const jwt = req.signedCookies[jwtCookieProps.key];
        if (!jwt) {
            if(req.headers.authorization?.includes('Token:'))
            {
                var apitoken = req.headers.authorization.replace('Token:', '');
                var api = !!(await userDao.checkApiToken(apitoken));
                if (api)
                {
                    next();
                }
                return;
            }
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Standard||clientData.role === UserRoles.Admin) {
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};



    // Middleware to verify if user is an admin
export const getEmail =  async (req: Request) => {
        // Get json-web-token

        const jwt = req.signedCookies[jwtCookieProps.key];

        if (!jwt) {
            if(req.headers.authorization?.includes('Token:'))
            {
                var apitoken = req.headers.authorization.replace('Token:', '');
                var user = await userDao.checkApiToken(apitoken);
                if (user)
                {
                    return user.email;
                }
                return  '';
            }
        } 

        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Standard||clientData.role === UserRoles.Admin) {
            return clientData.email;
        } else {
            throw Error('JWT not present in signed cookie.');
        }
}