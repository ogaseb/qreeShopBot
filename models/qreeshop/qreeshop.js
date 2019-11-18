"use strict";
module.exports = (sequelize, DataTypes) => {
  const QreeItems = sequelize.define(
    "QreeItems",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      qrData: { type: DataTypes.TEXT, field: "qr_data" },
      qrImageUrl: { type: DataTypes.TEXT, field: "qr_image_url" },
      qrLink: { type: DataTypes.STRING, field: "qr_link" },
      name: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      platform: DataTypes.STRING,
      size: DataTypes.STRING,
      uploaderDiscordId: {
        type: DataTypes.STRING,
        field: "uploader_discord_id"
      },
      uploaderName: { type: DataTypes.STRING, field: "uploader_name" },
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at"

        },
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at"
        }
    },
    {
      freezeTableName: true,
      tableName: "qre_items"
    }
  );
  QreeItems.associate = function(models) {
    // associations can be defined here
  };
  return QreeItems;
};
