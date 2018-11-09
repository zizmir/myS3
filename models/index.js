import Sequelize, { Op } from 'sequelize';
import dotenv from 'dotenv';

import User from './user';
import Bucket from './bucket';

dotenv.config();
export const db = new Sequelize(
  process.env.DATABASE_URL, {
    operatorsAliases: Op,
    define: {
      underscored: true,
    },
  },
);
const modelUser = User.init(db, Sequelize);
const modelBucket = Bucket.init(db, Sequelize);

modelUser.hasMany(Bucket, { as: 'buckets' });
modelBucket.belongsTo(User, { as: 'user' });
