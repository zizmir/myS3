// 78cb859bffe6a5d70a9ccc93557b9a6568c2b3bf
import { Router } from 'express';
import Bucket from '../models/bucket';
import FileSystem from '../lib/filesystem';

const api = Router();
api.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const { uuid } = req.user;

    const bucket = new Bucket({
      name, user_uuid: uuid,
    });

    FileSystem.createBucket(req.user, name);
    await bucket.save();
    res.status(201).json({ bucket });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
api.get('/', async (req, res) => {
  try {
    const buckets = await Bucket.findAll();
    res.status(200).json({ data: { buckets }, meta: {} });
  } catch (err) {
    res.status(400).json({ err: err.messages });
  }
});
api.get('/:id', async (req, res) => {
  try {
    const bucket = await Bucket.find({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: { bucket }, meta: {} });
  } catch (err) {
    res.status(40).json({ err: err.messages });
  }
});
api.delete('/:id', async (req, res) => {
  try {
    const bucket = await Bucket.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: { bucket }, meta: {} });
  } catch (err) {
    res.status(404).json({ err: err.messages });
  }
});
api.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;

    const bucket = await Bucket.update(
      { name },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json({ data: { bucket }, meta: {} });
  } catch (err) {
    res.status(404).json({ err: err.messages });
  }
});

export default api;
