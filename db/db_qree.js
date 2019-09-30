import dotEnv from "dotenv";
import { Sequelize } from "sequelize";
dotEnv.config();
const Op = Sequelize.Op;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  define: { timestamps: false }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize -> Connection has been established successfully.");
  })
  .catch(err => {
    console.error("sequelize -> Unable to connect to the database:", err);
  });

class QreeItems extends Sequelize.Model {}
QreeItems.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    qr_data: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    qr_image_url: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    qr_link: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    platform: {
      type: Sequelize.STRING,
      allowNull: false
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uploader_discord_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    uploader_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "qre_items"
    // options
  }
);

sequelize.sync();

export async function createQree(
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
}

export async function editQree(
  id,
  qr_data,
  qr_image_url,
  qr_link,
  name,
  platform,
  region,
  size,
  uploader_discord_id,
  uploader_name,
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
        size,
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
}

export async function findGame(name) {
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
    const res = await QreeItems.findAll({
      where: {
        [Op.and]: filter
      }
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function findGameToEdit(id) {
  try {
    const res = await QreeItems.findAll({
      where: {
        id
      },
      limit: 1
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function approxQrCount() {
  try {
    return await QreeItems.findAndCountAll();
  } catch (e) {
    console.log(e);
  }
}

export async function getWholeDB() {
  try {
    return await QreeItems.findAll();
  } catch (e) {
    console.log(e);
  }
}

export async function updateQrImageUrl(id, qr_image_url) {
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
}

export async function updateSizeArgument(id, size) {
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
}

export async function updateRegionArgument(id, region) {
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
}
