import { Router } from 'express';
import passport from 'passport';
import User from '../models/user';
import Mail from '../lib/mail';
import jwt from 'jsonwebtoken';

const api = Router();

api.post('/register', async (req, res )=> {
  const { nickname , email, password , password_confirmation } = req.body ;
  console.log(req.body)
  let user = new User({
    nickname : nickname,
    email: email,
    password : password,
    password_confirmation : password_confirmation
  });
  await user.save();
  const text = "New subscription"
  Mail.send(user.email,"Welcome", text , `${text}`)
  const payload = { uuid: user.uuid , nickname, email};

  const token = jwt.sign(payload, process.env.JWT_ENCRYPTION)
  res.status(201).json({ data : { user }, meta : { token }})
})
api.post("/login", (req, res)=>{
  passport.authenticate(
    "locale",
    {
    session : false
    },
    (err, user , message)=>{
         if( err){
           res.status(400).json({err})
         }
         const {id , email ,nickname} = user.toJSON()
         return res.statut(200).json({data : {user: {uuid, nickname, email}}})
    }
  )
})

export default api;
