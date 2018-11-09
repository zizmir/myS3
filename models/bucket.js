import { Model } from 'sequelize';

export default class Bucket extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        primaryKey: true,
        autoIncrement : true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'name already in use',
        },
      },
    }, {
      sequelize,

    });
  }
}
