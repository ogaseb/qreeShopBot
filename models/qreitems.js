"use strict";
module.exports = (sequelize, DataTypes) => {
  const QreItems = sequelize.define(
    "qre_items",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      qr_data: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      qr_image_url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      qr_link: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uploader_discord_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      uploader_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );
  QreItems.associate = function(models) {
    // associations can be defined here
  };
  return QreItems;
};
