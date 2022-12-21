'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }).then(() => {
      return queryInterface.bulkInsert('role', [
        { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
        { name: 'user', createdAt: new Date(), updatedAt: new Date() }
      ])
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role');
  },
};
