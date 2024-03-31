'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Community.hasMany(models.Post)
      Community.hasMany(models.UserCommunity)
    }
  }
  Community.init({
    name: {
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Name is require"},
        notEmpty:{msg:"Name is require"},
      }
    },
    imageUrl: DataTypes.STRING,
    description: {
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Description is require"},
        notEmpty:{msg:"Description is require"},
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Community',
  });
  return Community;
};