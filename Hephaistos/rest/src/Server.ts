import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import BaseRouter from './routes';

const cors = require('cors')

// Init express
const app = express();

var whitelist = ['http://localhost:3001', 'http://www.hephaistos.online']
var corsOptions = {
    origin: (origin:any, callback:any) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(null, true);
          //callback(new Error('Not allowed by CORS'));
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
app.use('/api', BaseRouter);



// Export express instance
export default app;
