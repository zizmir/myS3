import { Router } from 'express';
import passport from 'passport';
import auth from './auth';
import users from './user';
import buckets from './bucket';

const api = Router();

api.get('/', (req, res) => {
  res.json({ hello: 'from express .island' });
});

api.use('/users', passport.authenticate('jwt', { session: false }), users);
api.use('/users/:uuid/buckets',
  passport.authenticate('jwt', { session: false }),
  buckets);
api.use('/auth', auth);

export default api;
