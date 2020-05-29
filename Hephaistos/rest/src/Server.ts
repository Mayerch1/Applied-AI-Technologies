import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';

import { Request, Response } from 'express';
import { jwtCookieProps } from '@shared';
const cors = require('cors')

// Init express
const app = express();

var whitelist = ['http://localhost:3001', 'http://example2.com']
var corsOptions = {
    origin: (origin:any, callback:any) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
    
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', BaseRouter);


/**
 * Serve front-end content.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('/', (req: Request, res: Response) => {
    res.sendFile('login.html', {root: viewsDir});
});

app.get('/users', (req: Request, res: Response) => {
    const jwt = req.signedCookies[jwtCookieProps.key];
    if (!jwt) {
        res.redirect('/');
    } else {
        res.sendFile('users.html', {root: viewsDir});
    }
});


// Export express instance
export default app;
