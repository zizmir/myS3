// 78cb859bffe6a5d70a9ccc93557b9a6568c2b3bf
import { Router } from 'express';
import { pick } from 'lodash';
import User from '../models/user';

const api = Router();

api.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ data: { users }, meta: {} });
  } catch (err) {
    res.status(400).json({ err: err.messages });
  }
});
api.get('/:id', async (req, res) => {
  try {
    const user = await User.find({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(204).json({ data: { user }, meta: {} });
  } catch (err) {
    res.status(404).json({ err: err.messages });
  }
});
api.delete('/:id', async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ data: { user }, meta: {} });
  } catch (err) {
    res.status(404).json({ err: err.messages });
  }
});
api.put('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.params.id } });
    console.log(user);

    if (user) {
      const fields = pick(req.body, [
        'nickname',
        'email',
        'password',
        'password_confirmation',
      ]);
      await user.update(fields);
      res.status(204).send();
    }
  } catch (err) {
    res.status(400).json({ err: err.messages });
  }
});
export default api;
