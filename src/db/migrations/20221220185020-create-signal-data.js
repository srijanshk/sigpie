'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('signal-data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      actionType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      orderType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stopLoss: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      takeProfit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      meta: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('signal-data');
  },
};
