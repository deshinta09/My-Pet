'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/dataCommunity.json')
    data = data.map(el=>{
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Communities', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Communities', null, {})
  }
};
