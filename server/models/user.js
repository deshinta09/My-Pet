'use strict';
const {
  Model
} = require('sequelize');
const { createPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserCommunity)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Username is require"},
        notEmpty:{msg:"Username is require"},
      }
    },
    imageUrl: DataTypes.STRING,
    email: {
      type: DataTypes.STRING, allowNull: false,
      unique:{args: true, msg:"Email must be unique"},
      validate:{
        notNull:{args: true,msg:"Email is require"},
        isEmail:{msg:"Email must be type email"},
        notEmpty:{msg:"Email is require"}
      }
    },
    password: {
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Password is require"},
        notEmpty:{msg:"Password is require"},
      }
    },
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate( (user) => {
    const hashedPassword = createPassword(user.password);
    user.password = hashedPassword;
  });
  return User;
};