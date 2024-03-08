'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kegiatans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proyekId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Proyeks',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      judul: {
        type: Sequelize.STRING,
      },
      tgl_mulai: {
        type: Sequelize.DATEONLY,
      },
      tgl_selesai: {
        type: Sequelize.DATEONLY,
      },
      waktu_mulai: {
        type: Sequelize.TIME,
      },
      waktu_selesai: {
        type: Sequelize.TIME,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kegiatans');
  },
};
