import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Mail from '../lib/mail';

const api = Router();

api.post('/register', async (req, res) => {
  const {
    nickname, email, password, password_confirmation,
  } = req.body;
  const user = new User({
    nickname,
    email,
    password,
    password_confirmation,
  });
  await user.save();
  const text = 'New subscription';
  Mail.send(user.email, 'Welcome', text, `${text}`);
  const payload = { uuid: user.uuid, nickname, email };

  const token = jwt.sign(payload, process.env.JWT_ENCRYPTION);
  res.status(201).json({ data: { user }, meta: { token } });
});

api.post('/login', (req, res) => {
  passport.authenticate(
    'local',
    {
      session: false,
    },
    (err, user, message) => {
      if (err) {
        res.status(400).json({ err });
      }
      const { uuid, email, nickname } = user.toJSON();

      const token = jwt.sign({ uuid, nickname, email }, process.env.JWT_ENCRYPTION);

      return res.status(200).json({ data: { user }, meta: token });
    },
  )(req, res);
});

export default api;
