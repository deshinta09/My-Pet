'use strict';

const { createPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let data = [
    {
      username:'user2', email:'user2@mail.com', password:createPassword('secret'), imageUrl:'-', status:'regular', createdAt: new Date(), updatedAt: new Date()
    },
    {
      username:'user3', email:'user3@mail.com', password:createPassword('secret'), imageUrl:'-', status:'regular', createdAt: new Date(), updatedAt: new Date()
    },
    {
      username:'user4', email:'user4@mail.com', password:createPassword('secret'), imageUrl:'-', status:'regular', createdAt: new Date(), updatedAt: new Date()
    }
   ]
   await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
