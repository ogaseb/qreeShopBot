require("dotenv").config();
const { Sequelize } = require("sequelize");
const models = require("../models/index");
const Op = Sequelize.Op;
const QreeItems = models.QreeItems;

module.exports.createQree = async function(
  {
    qr_data,
    qr_image_url,
    qr_link,
    name,
    platform,
    region,
    size,
    uploader_discord_id,
    uploader_name
  },
  receivedMessage
) {
  try {
    const item = await QreeItems.create({
      qr_data,
      qr_image_url,
      qr_link,
      name,
      platform,
      region,
      size,
      uploader_discord_id,
      uploader_name
    });
    await receivedMessage.channel.send("Saving in database!");
    console.log("DB -> save qr in DB");
    return item.id;
  } catch (e) {
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
    console.log(e);
  }
};
module.exports.editQree = async function(
  id,
  {
    qr_data,
    qr_image_url,
    qr_link,
    name,
    platform,
    region,
    uploader_discord_id,
    uploader_name
  },
  newSize,
  receivedMessage
) {
  try {
    await QreeItems.update(
      {
        qr_data,
        qr_image_url,
        qr_link,
        name,
        platform,
        region,
        newSize,
        uploader_discord_id,
        uploader_name
      },
      { where: { id } }
    );
    await receivedMessage.channel.send("Edited!");
    console.log("DB -> save qr in DB");
  } catch (e) {
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
    console.log(e);
  }
};

module.exports.findGame = async function(name) {
  let filter = [];
  let words = name.split(" ");
  words.forEach(word => {
    filter.push({
      name: {
        [Op.iLike]: `%${word}%`
      }
    });
  });

  try {
    return await QreeItems.findAll({
      where: {
        [Op.and]: filter
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.findGameToEdit = async function(id) {
  try {
    return await QreeItems.findAll({
      where: {
        id
      },
      limit: 1
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.approxQrCount = async function() {
  try {
    return await QreeItems.findAndCountAll();
  } catch (e) {
    console.log(e);
  }
};

module.exports.getWholeDB = async function() {
  try {
    return await QreeItems.findAll();
  } catch (e) {
    console.log(e);
  }
};

module.exports.updateQrImageUrl = async function(id, qr_image_url) {
  try {
    await QreeItems.update(
      {
        qr_image_url
      },
      { where: { id } }
    );
    console.log("DB -> updating qr url image");
  } catch (e) {
    console.log(e);
  }
};

module.exports.updateSizeArgument = async function(id, size) {
  try {
    const res = await QreeItems.update(
      {
        size
      },
      { where: { id } }
    );

    console.log("DB -> updating size for id: " + id);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports.updateThumbnail = async function(id, thumbnail) {
  try {
    const res = await QreeItems.update(
      {
        thumbnail
      },
      { where: { id } }
    );

    console.log("DB -> updating thumbnail for id: " + id);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports.updateRegionArgument = async function(id, region) {
  try {
    const res = await QreeItems.update(
      {
        region
      },
      { where: { id } }
    );

    console.log("DB -> updating region for id: " + id);
    return res;
  } catch (e) {
    console.log(e);
  }
};
