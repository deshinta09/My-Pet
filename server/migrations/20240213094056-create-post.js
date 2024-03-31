'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
      },
      CommunityId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Communities',key:'id'
        }, onDelete:'cascade', onUpdate:'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};