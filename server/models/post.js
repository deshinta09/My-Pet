'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Community)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Title is require"},
        notEmpty:{msg:"Title is require"},
      }
    },
    imageUrl: DataTypes.STRING,
    message: {
      type: DataTypes.STRING, allowNull: false,
      validate:{
        notNull:{msg:"Message is require"},
        notEmpty:{msg:"Message is require"},
      }
    },
    CommunityId: {
      type: DataTypes.INTEGER, allowNull: false,
      validate:{
        notNull:{msg:"CommunityId is require"},
        notEmpty:{msg:"CommunityId is require"},
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};