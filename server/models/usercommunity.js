'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCommunity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserCommunity.belongsTo(models.User)
      UserCommunity.belongsTo(models.Community)
    }
  }
  UserCommunity.init({
    UserId: DataTypes.INTEGER,
    CommunityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCommunity',
  });
  return UserCommunity;
};