"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("qre_items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qr_data: {
        type: Sequelize.TEXT
      },
      qr_image_url: {
        type: Sequelize.TEXT
      },
      qr_link: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      uploader_discord_id: {
        type: Sequelize.STRING
      },
      uploader_name: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("qre_items");
  }
};
