'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {UserId:1,CommunityId:1,createdAt:new Date(),updatedAt:new Date()},
      {UserId:2,CommunityId:2,createdAt:new Date(),updatedAt:new Date()},
      {UserId:2,CommunityId:1,createdAt:new Date(),updatedAt:new Date()},
      {UserId:3,CommunityId:3,createdAt:new Date(),updatedAt:new Date()},
      {UserId:3,CommunityId:2,createdAt:new Date(),updatedAt:new Date()}
    ]
    await queryInterface.bulkInsert('UserCommunities', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserCommunities', null, {})
  }
};
