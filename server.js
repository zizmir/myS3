import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import bodyParser from 'body-parser'
import { mLog } from './lib/utils';
import { db as database } from './models';
import routes from './routes';
import "./middlewares/passport";

const port = parseInt(process.argv[2]) || process.env.PORT;

const app = express();
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const start = (async () => {
  try {
    await database.authenticate();
    if (process.env.APP === 'development') {
      database.sync({ force: process.env.DATABASE_SYNC_FORCE });
    }

    app.use('/api', routes)

    app.listen(port, (err) => {
      if (err) {
        throw err;
      } else {
        mLog(`Server is running on port ${port}`, 'cyan');
      }
    });
  } catch (e) {}
})();
