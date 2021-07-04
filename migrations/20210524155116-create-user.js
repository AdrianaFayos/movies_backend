'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2, 20],
        },
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2, 20],
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [6, 16],
        }
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      subscription: {
        type: Sequelize.BOOLEAN
      },
      adress: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};