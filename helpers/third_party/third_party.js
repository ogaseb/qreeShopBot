const axios = require("axios");
const { updateThumbnail } = require("../../controllers/qre_items");

async function getRandomMeme(searchPhrase) {
  const tenor = {
    baseURL: "https://api.tenor.com/v1/random",
    apiKey: "T64EWZS77O3H",
    tag: searchPhrase,
    rating: "medium"
  };

  let tenorURL = encodeURI(
    `${tenor.baseURL}?key=${tenor.apiKey}&q=${tenor.tag}&contentfilter=${tenor.rating}&media_filter=minimal&limit=1`
  );
  const tenorResponse = await axios.get(tenorURL);
  return tenorResponse.data.results[0].media[0].gif.url;
}

async function getGameCover(name, id) {
  let config = {
    headers: {
      "user-key": process.env.IGDB_TOKEN,
      Accepts: "application/json"
    }
  };
  try {
    const title = name.replace(/[^a-zA-Z0-9 ]/gm, "");
    const game = await axios.get(
      `https://api-v3.igdb.com/games/?search=${title}}&fields=id,name,cover`,
      config
    );
    if (!!game.data.length && typeof game.data[0].cover !== undefined) {
      const cover = await axios.get(
        `https://api-v3.igdb.com/covers/${game.data[0].cover}/?fields=url`,
        config
      );
      if (id) {
        await updateThumbnail(id, `https:${cover.data[0].url}`);
      }
      return `https:${cover.data[0].url}`;
    } else {
      console.log("setting default cover");
      if (id) {
        await updateThumbnail(
          id,
          `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`
        );
      }
      return `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getRandomMeme,
  getGameCover
};
