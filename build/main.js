/******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = "./server.js")
  );
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "./models/qreitems.js":
      /*!****************************!*\
  !*** ./models/qreitems.js ***!
  \****************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        "use strict";
        eval(
          "\nmodule.exports = (sequelize, DataTypes) => {\n  const QreItems = sequelize.define('qre_items', {\n    id: {\n      type: DataTypes.INTEGER,\n      autoIncrement: true,\n      allowNull: false,\n      primaryKey: true\n    },\n    qr_data: {\n      type: DataTypes.TEXT,\n      allowNull: false\n    },\n    qr_image_url: {\n      type: DataTypes.TEXT,\n      allowNull: false\n    },\n    qr_link: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    name: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    thumbnail: {\n      type: DataTypes.STRING,\n      allowNull: true\n    },\n    platform: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    region: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    size: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    uploader_discord_id: {\n      type: DataTypes.STRING,\n      allowNull: false\n    },\n    uploader_name: {\n      type: DataTypes.STRING,\n      allowNull: false\n    }\n  }, {\n    underscored: true\n  });\n  QreItems.associate = function(models) {\n    // associations can be defined here\n  };\n  return QreItems;\n};\n\n\n//# sourceURL=webpack:///./models/qreitems.js?"
        );

        /***/
      },

    /***/ "./server.js":
      /*!*******************!*\
  !*** ./server.js ***!
  \*******************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_commands_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/commands/index */ "./src/commands/index.js");\n/* harmony import */ var _src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var _src_db_db_qree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/db/db_qree */ "./src/db/db_qree.js");\n__webpack_require__(/*! dotenv */ "dotenv").config();\n\n\n\n\n\nprocess.on("unhandledRejection", (err, p) => {\n  console.log("An unhandledRejection occurred");\n  console.log(`Rejected Promise: ${p}`);\n  console.log(`Rejection: ${err}`);\n});\n\nconst client = new discord_js__WEBPACK_IMPORTED_MODULE_0__["Client"]();\nlet botInvoker = process.env.BOT_DEFAULT_INVOKE;\nlet serverInvokers = new Map();\n\nvoid (async function() {\n  try {\n    await client.login(process.env.BOT_TOKEN);\n  } catch (e) {\n    console.log(e);\n  }\n})();\n\nclient.on("ready", async () => {\n  console.log("On Discord!");\n  console.log("Connected as " + client.user.tag);\n  console.log("Servers:");\n  client.guilds.forEach(guild => {\n    serverInvokers.set(guild.id, botInvoker);\n    console.log(" - " + guild.id);\n    guild.channels.forEach(channel => {\n      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);\n    });\n\n    console.log(serverInvokers);\n  });\n\n  setInterval(async () => {\n    const qrCount = await Object(_src_db_db_qree__WEBPACK_IMPORTED_MODULE_3__["approxQrCount"])();\n    await client.user.setActivity(`QR Codes count: ${qrCount.count}`, {\n      type: "PLAYING"\n    });\n  }, 60000);\n\n  setInterval(async () => {\n    await Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["urlStatus"])(client);\n  }, 1000 * 60 * 60 * 24);\n});\n\nclient.on("message", receivedMessage => {\n  if (receivedMessage.author === client.user) {\n    return;\n  }\n\n  if (receivedMessage.channel.type === "dm") {\n    if (receivedMessage.content.startsWith(`${botInvoker}`)) {\n      processCommand(receivedMessage);\n    } else {\n      return receivedMessage.channel.send(\n        `You need to specify which command you want to use type "!qre help" to display available commands`\n      );\n    }\n  } else {\n    if (\n      receivedMessage.content.startsWith(\n        `${serverInvokers.get(receivedMessage.guild.id)}`\n      )\n    ) {\n      processCommand(receivedMessage);\n    }\n  }\n});\n\nfunction processCommand(receivedMessage) {\n  let fullCommand, primaryCommand;\n\n  Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkIfDM"])(receivedMessage)\n    ? (fullCommand = receivedMessage.content.substr(botInvoker.length + 1))\n    : (fullCommand = receivedMessage.content.substr(\n        serverInvokers.get(receivedMessage.guild.id).length + 1\n      ));\n\n  const messageArguments = fullCommand.match(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["regexes"].ARGUMENTS);\n\n  if (messageArguments !== null && messageArguments.length) {\n    primaryCommand = messageArguments[0]; // The first word directly after the exclamation is the command\n  }\n\n  console.log(primaryCommand);\n\n  if (!primaryCommand) {\n    Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkIfDM"])(receivedMessage)\n      ? receivedMessage.channel.send(\n          `You need to specify which command you want to use type "!qre help" to display available commands`\n        )\n      : receivedMessage.channel.send(\n          `You need to specify which command you want to use type "${serverInvokers.get(\n            receivedMessage.guild.id\n          )} help" to display available commands`\n        );\n  }\n\n  if (primaryCommand === "help") {\n    return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["createEmbeddedHelper"])(serverInvokers, receivedMessage).build();\n  }\n\n  if (primaryCommand === "search") {\n    return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["searchGame"])(fullCommand, receivedMessage);\n  }\n\n  if (primaryCommand === "headpat") {\n    Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateGuilds"])(receivedMessage)\n      ? Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["headPat"])(messageArguments, receivedMessage)\n      : null;\n  }\n\n  if (primaryCommand === "upload") {\n    if (\n      Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateGuilds"])(receivedMessage) &&\n      Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validatePermissions"])(receivedMessage)\n    ) {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["handleGameUpload"])(messageArguments, receivedMessage, client);\n    } else {\n      return receivedMessage.channel.send(\n        `You need to have permissions to use this command`\n      );\n    }\n  }\n\n  if (Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateGuilds"])(receivedMessage) && Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateAdmin"])(receivedMessage)) {\n    if (primaryCommand === "invoke") {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["changeInvokeCommand"])(\n        messageArguments,\n        receivedMessage,\n        serverInvokers\n      );\n    }\n\n    if (primaryCommand === "scrap") {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["scrapChannelForQrCodes"])(messageArguments, receivedMessage);\n    }\n\n    if (primaryCommand === "images") {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["makeQrImagesfromDB"])(messageArguments, receivedMessage);\n    }\n\n    if (primaryCommand === "edit") {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["handleGameEdit"])(messageArguments, receivedMessage);\n    }\n\n    if (primaryCommand === "checkurls") {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["urlStatus"])(client);\n    }\n\n    if (primaryCommand === "updatesize") {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["updateSize"])(client);\n    }\n\n    if (primaryCommand === "findcovers") {\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["findCovers"])(client);\n    }\n  }\n\n  return receivedMessage.channel.send(\n    `You need to specify which command you want to use type "!qre help" to display available commands`\n  );\n}\n\n\n//# sourceURL=webpack:///./server.js?'
        );

        /***/
      },

    /***/ "./src/commands/checkurls/checkurls.js":
      /*!*********************************************!*\
  !*** ./src/commands/checkurls/checkurls.js ***!
  \*********************************************/
      /*! exports provided: urlStatus */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlStatus", function() { return urlStatus; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nasync function urlStatus(client) {\n  await client.channels\n    .get("604692367018033152")\n    .send(`Checking urls started... I will do it every 24 hours`);\n  const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["getWholeDB"])();\n  for (const { id, qr_link, name, uploader_discord_id } of rows) {\n    try {\n      console.time(`scanningTime - ${name}`);\n      await axios__WEBPACK_IMPORTED_MODULE_1___default.a.head(qr_link, { timeout: 30000 });\n      console.timeEnd(`scanningTime - ${name}`);\n    } catch (e) {\n      if (e.response) {\n        if (e.response.status === 404) {\n          await client.channels\n            .get("604692367018033152")\n            .send(\n              `${qr_link} sends ${e.response.status} respond code (not found or other error) for game: ${name}. DB ID for updating: ${id} . <@${uploader_discord_id}>`\n            );\n        }\n      } else {\n        await client.channels\n          .get("604692367018033152")\n          .send(\n            `${qr_link} sends error, but link probably works, check by clicking on it: ${name}. DB ID for updating: ${id} . <@${uploader_discord_id}>`\n          );\n      }\n    }\n  }\n  await client.channels\n    .get("604692367018033152")\n    .send(`All games have been scanned!`);\n}\n\n\n//# sourceURL=webpack:///./src/commands/checkurls/checkurls.js?'
        );

        /***/
      },

    /***/ "./src/commands/edit/edit.js":
      /*!***********************************!*\
  !*** ./src/commands/edit/edit.js ***!
  \***********************************/
      /*! exports provided: handleGameEdit */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleGameEdit", function() { return handleGameEdit; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! image-data-uri */ "image-data-uri");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(image_data_uri__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nasync function handleGameEdit(messageArguments, receivedMessage) {\n  try {\n    const id = parseInt(messageArguments[1]);\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["findGameToEdit"])(id);\n    const {\n      qr_data,\n      qr_image_url,\n      qr_link,\n      name,\n      platform,\n      region,\n      size,\n      uploader_discord_id,\n      uploader_name\n    } = rows[0];\n    if (rows.length) {\n      await receivedMessage.channel.send(\n        `\\`\\`\\`\\nLink: ${qr_link}\\n\\nName: ${name}\\nPlatform: ${platform}\\nRegion: ${region}\\nSize: ${size}\\nUploader: ${uploader_name}\\`\\`\\` \n        \\`\\`\\`Is this the game you wish to edit? type \'yes\'/\'no\'\\`\\`\\``,\n        {\n          files: [qr_image_url]\n        }\n      );\n\n      const collector = new discord_js__WEBPACK_IMPORTED_MODULE_1__["MessageCollector"](\n        receivedMessage.channel,\n        m => m.author.id === receivedMessage.author.id,\n        { time: 120000 }\n      );\n\n      collector.on("collect", async message => {\n        if (message.content.toLowerCase() === "yes") {\n          await receivedMessage.channel.send(\n            `\\`\\`\\`please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.\\`\\`\\`\n            \\`\\`\\`type \\`end\\` if you want to finish\\`\\`\\``\n          );\n        }\n        if (message.content.toLowerCase() === "no") {\n          collector.stop();\n          await receivedMessage.channel.send(\n            "``` Ok, will not do anything with it ```"\n          );\n        }\n\n        if (message.content.toLowerCase() === "end") {\n          collector.stop();\n        }\n      });\n\n      collector.on("end", async collected => {\n        let collectedArguments = [];\n        for (const item of collected) {\n          collectedArguments.push(item[1].content);\n        }\n\n        const args = collectedArguments\n          .filter(\n            function(e) {\n              return this.indexOf(e.toLowerCase()) < 0;\n            },\n            ["end", "yes", "no"]\n          )\n          .join(" ")\n          .match(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["regexes"].ARGUMENTS);\n\n        const regexesObj = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["filteredRegexes"])([\n          "URL",\n          "TITLE",\n          "REGIONS",\n          "PLATFORMS",\n          "SIZE"\n        ]);\n        let foundArgsObj = {};\n        for (const regex in regexesObj) {\n          console.log(regexesObj[regex]);\n          const itemIndex = args.findIndex(value =>\n            regexesObj[regex].test(value)\n          );\n          if (itemIndex === -1) {\n            await receivedMessage.channel.send(\n              `argument \\`${regex}\\` is missing continue...`\n            );\n          } else {\n            foundArgsObj[regex] = args[itemIndex];\n            args.splice(itemIndex, 1);\n            await receivedMessage.channel.send(\n              `argument \\`${regex}\\` is present! : \\`${foundArgsObj[regex]}\\``\n            );\n          }\n        }\n\n        console.log(foundArgsObj);\n\n        const obj = {\n          name: foundArgsObj.TITLE\n            ? foundArgsObj.TITLE.replace(/[\'"]+/g, "")\n            : name,\n          qr_link: foundArgsObj.URL ? foundArgsObj.URL : qr_link,\n          qr_data: foundArgsObj.URL\n            ? Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["createASCIIQrCode"])(foundArgsObj.URL)\n            : qr_data,\n          qr_image_url: foundArgsObj.URL\n            ? Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["createDataURLQrCode"])(foundArgsObj.URL)\n            : qr_image_url,\n          platform: foundArgsObj.PLATFORMS ? foundArgsObj.PLATFORMS : platform,\n          region: foundArgsObj.REGIONS ? foundArgsObj.REGIONS : region,\n          size: foundArgsObj.SIZE ? foundArgsObj.SIZE : size,\n          uploader_discord_id: uploader_discord_id,\n          uploader_name: uploader_name\n        };\n\n        let newSize = "";\n        if (foundArgsObj.URL) {\n          let string =\n            obj.name + obj.platform + obj.region + obj.uploader_discord_id;\n          string = string.replace(/[^a-z0-9]/gim, "");\n          await image_data_uri__WEBPACK_IMPORTED_MODULE_3___default.a.outputFile(\n            obj.qr_image_url,\n            "./img/" + string + ".jpg"\n          );\n\n          await receivedMessage.channel\n            .send("", {\n              files: ["./img/" + string + ".jpg"]\n            })\n            .then(msg => {\n              obj.qr_image_url = msg.attachments.values().next().value.proxyURL;\n            });\n\n          newSize = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkFileSize"])(foundArgsObj.URL);\n        }\n\n        await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["editQree"])(id, obj, newSize ? newSize : obj.size, receivedMessage);\n      });\n    } else {\n      await receivedMessage.channel.send("cant find it in database");\n    }\n  } catch (e) {\n    console.log(e);\n    await receivedMessage.channel.send(\n      "something went wrong, send it to developer: \\n" +\n        "```diff\\n- " +\n        e +\n        "```"\n    );\n  }\n}\n\n\n//# sourceURL=webpack:///./src/commands/edit/edit.js?'
        );

        /***/
      },

    /***/ "./src/commands/findcovers/findcovers.js":
      /*!***********************************************!*\
  !*** ./src/commands/findcovers/findcovers.js ***!
  \***********************************************/
      /*! exports provided: findCovers */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findCovers", function() { return findCovers; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n\n\n\n\nasync function findCovers(client) {\n  await client.channels\n    .get("605181514321494036")\n    .send(`searching for covers...`);\n  const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["getWholeDB"])();\n  for (const { id, name } of rows) {\n    try {\n      console.time(`searchingTime - ${name}`);\n      await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["getGameCover"])(name, id);\n      console.timeEnd(`searchingTime - ${name}`);\n    } catch (e) {\n      console.log(e);\n    }\n  }\n  await client.channels\n    .get("605181514321494036")\n    .send(`All games have been scanned!`);\n}\n\n\n//# sourceURL=webpack:///./src/commands/findcovers/findcovers.js?'
        );

        /***/
      },

    /***/ "./src/commands/headpat/headpat.js":
      /*!*****************************************!*\
  !*** ./src/commands/headpat/headpat.js ***!
  \*****************************************/
      /*! exports provided: headPat */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headPat", function() { return headPat; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nasync function headPat(messageArgument, receivedMessage) {\n  if (messageArgument.length !== 2) {\n    return receivedMessage.channel.send(\n      `hey, specify who you want to headpat!`\n    );\n  }\n  receivedMessage.channel.messages.get(receivedMessage.id).delete();\n  const meme = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["getRandomMeme"])("head-pat-anime");\n  const embedHeadpat = new discord_js__WEBPACK_IMPORTED_MODULE_1__["RichEmbed"]()\n    .setColor(`${"#" + Math.floor(Math.random() * 16777215).toString(16)}`)\n    .setDescription(\n      `uwu *<@${receivedMessage.author.id}> headpats <@${messageArgument[1]}>*`\n    )\n    .setImage(meme);\n  receivedMessage.channel.send(embedHeadpat);\n}\n\n\n//# sourceURL=webpack:///./src/commands/headpat/headpat.js?'
        );

        /***/
      },

    /***/ "./src/commands/help/help.js":
      /*!***********************************!*\
  !*** ./src/commands/help/help.js ***!
  \***********************************/
      /*! exports provided: createEmbeddedHelper */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmbeddedHelper", function() { return createEmbeddedHelper; });\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! discord-paginationembed */ "discord-paginationembed");\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(discord_paginationembed__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n\n\n\n\nfunction createEmbeddedHelper(\n  serverInvokers,\n  receivedMessage,\n  destination\n) {\n  const embeds = [];\n\n  if (Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkIfDM"])(receivedMessage)) {\n    embeds.push(\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\n        .addField("**COMMAND**: ", "```search```")\n        .addField(\n          "Description",\n          "```search -  It\'s available on channels and DM\'s, it will search for all games containing typed phrase. (emoji navigation in dm\'s is a little buggy but it works)```"\n        )\n        .addField("Command: ", \'```!qre search "<name>" ```\')\n        .addField("Example: ", \'```!qre search "Super Castlevania IV"```\')\n    );\n  } else {\n    embeds.push(\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\n        .addField("**COMMAND**: ", "```upload```")\n        .addField(\n          "Description",\n          "```upload - upload is available only in certain servers on " +\n            "Discord and only available to users containing special role(s). " +\n            "Remember about quotation marks in title of the game!```"\n        )\n        .addField(\n          "Arguments: ",\n          "```" +\n            "<platform> -  GBA, GBC, GAMEBOY, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO, VIRTUAL CONSOLE, MEGA DRIVE, SEGA GENESIS, MAME, TURBOGRAFX \\n\\n" +\n            "<regions> - USA, JPN, EUR, GLOBAL, HACK \\n\\n" +\n            "```"\n        )\n        .addField(\n          "Command: ",\n          "```" +\n            serverInvokers.get(receivedMessage.guild.id) +\n            \' upload <url> "<name>" <platform> <region>```\'\n        )\n\n        .addField(\n          "Example: ",\n          "```" +\n            serverInvokers.get(receivedMessage.guild.id) +\n            \' upload https://files.catbox.moe/au9pkx.cia "Super Castlevania IV" GBA USA```\'\n        )\n    );\n\n    embeds.push(\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\n        .addField("**COMMAND**: ", "```edit```")\n        .addField(\n          "Description",\n          "```edit - edit same as upload is available only in certain servers on " +\n            "Discord and only available to users containing special role(s). " +\n            "First you need to find the game you want to edit, just search it with search command and copy `DB ID` number" +\n            "then you proceed by typing edit command with this id ad you copied. After the game is found follow the instructions" +\n            "```"\n        )\n        .addField(\n          "Arguments: ",\n          "```" +\n            "<platform> - GBA, GBC, GAMEBOY, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO, VIRTUAL CONSOLE, MEGA DRIVE, SEGA GENESIS, MAME, TURBOGRAFX \\n\\n" +\n            "<regions> - USA, JPN, EUR, GLOBAL, HACK \\n\\n" +\n            "<size> - *KB, *MB, *GB \\n" +\n            "```"\n        )\n        .addField(\n          "Command: ",\n          "```" +\n            serverInvokers.get(receivedMessage.guild.id) +\n            " edit <id> ```"\n        )\n\n        .addField(\n          "Example: ",\n          "```" + serverInvokers.get(receivedMessage.guild.id) + " edit 10 ```"\n        )\n    );\n\n    embeds.push(\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\n        .addField("**COMMAND**: ", "```search```")\n        .addField(\n          "Description",\n          "```search -  It\'s available on channels and DM\'s, it will search for all games containing typed phrase. (emoji navigation in dm\'s is a little buggy but it works)```"\n        )\n        .addField(\n          "Command: ",\n          "```" +\n            serverInvokers.get(receivedMessage.guild.id) +\n            \' search "<name>" ```\'\n        )\n        .addField(\n          "Example: ",\n          "```" +\n            serverInvokers.get(receivedMessage.guild.id) +\n            \' search "Super Castlevania IV"```\'\n        )\n    );\n\n    embeds.push(\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\n        .addField("**COMMAND**: ", "```invoke```")\n        .addField(\n          "Description",\n          "```invoke - server only command which lets you change the command for invoking bot the default is always !qre```"\n        )\n        .addField(\n          "Command: ",\n          "```" +\n            serverInvokers.get(receivedMessage.guild.id) +\n            " invoke <new_command> ```"\n        )\n        .addField(\n          "Example: ",\n          "```" +\n            serverInvokers.get(receivedMessage.guild.id) +\n            "invoke %qre```"\n        )\n    );\n  }\n\n  return (\n    new discord_paginationembed__WEBPACK_IMPORTED_MODULE_1__["Embeds"]()\n      .setArray(embeds)\n      .setAuthorizedUsers([receivedMessage.author.id])\n      .setChannel(\n        destination === "pm" ? receivedMessage.author : receivedMessage.channel\n      )\n      .setPageIndicator(true)\n      .setPage(1)\n      // Methods below are for customising all embeds\n      .setTitle("Qr Code 3DS help")\n      .setDescription(\n        "=========================================================="\n      )\n      .addField(\n        "NOTE:",\n        "```links - you can provide direct link or normal sharing links from google and dropbox it will be automatically converted into direct ones```"\n      )\n      .setFooter("")\n      .setColor(0xffffff)\n      .setNavigationEmojis({\n        back: "◀",\n        jump: "↗",\n        forward: "▶",\n        delete: "🗑"\n      })\n      .setTimeout(600000)\n  );\n}\n\n\n//# sourceURL=webpack:///./src/commands/help/help.js?'
        );

        /***/
      },

    /***/ "./src/commands/images/images.js":
      /*!***************************************!*\
  !*** ./src/commands/images/images.js ***!
  \***************************************/
      /*! exports provided: makeQrImagesfromDB */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeQrImagesfromDB", function() { return makeQrImagesfromDB; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! image-data-uri */ "image-data-uri");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(image_data_uri__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nasync function makeQrImagesfromDB(messageArguments, receivedMessage) {\n  try {\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["getWholeDB"])();\n    for (const {\n      id,\n      qr_image_url,\n      qr_link,\n      name,\n      platform,\n      region,\n      uploader_discord_id\n    } of rows) {\n      const obj = {\n        qr_image: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createDataURLQrCode"])(qr_link),\n        uploader_discord_id,\n        id\n      };\n\n      if (qr_image_url === "null") {\n        let string = name + platform + region + uploader_discord_id;\n        string = string.replace(/[^a-z0-9]/gim, "");\n        await image_data_uri__WEBPACK_IMPORTED_MODULE_2___default.a.outputFile(obj.qr_image, "./img/" + string + ".jpg");\n        fs__WEBPACK_IMPORTED_MODULE_3___default.a.access("./img/" + string + ".jpg", fs__WEBPACK_IMPORTED_MODULE_3___default.a.F_OK, async err => {\n          if (err) {\n            console.error(err);\n            return;\n          }\n          const msg = await receivedMessage.channel.send("", {\n            files: ["./img/" + string + ".jpg"]\n          });\n          // file exists\n          console.log(msg.attachments.values().next().value.proxyURL);\n          obj.qr_image = msg.attachments.values().next().value.proxyURL;\n          await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["updateQrImageUrl"])(obj.id, obj.qr_image);\n        });\n      }\n    }\n  } catch (e) {\n    console.log(e);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/commands/images/images.js?'
        );

        /***/
      },

    /***/ "./src/commands/index.js":
      /*!*******************************!*\
  !*** ./src/commands/index.js ***!
  \*******************************/
      /*! exports provided: scrapChannelForQrCodes, changeInvokeCommand, handleGameUpload, searchGame, handleGameEdit, createEmbeddedHelper, makeQrImagesfromDB, urlStatus, updateSize, headPat, findCovers */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scrap_scrap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scrap/scrap.js */ "./src/commands/scrap/scrap.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrapChannelForQrCodes", function() { return _scrap_scrap_js__WEBPACK_IMPORTED_MODULE_0__["scrapChannelForQrCodes"]; });\n\n/* harmony import */ var _invoke_invoke_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoke/invoke.js */ "./src/commands/invoke/invoke.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeInvokeCommand", function() { return _invoke_invoke_js__WEBPACK_IMPORTED_MODULE_1__["changeInvokeCommand"]; });\n\n/* harmony import */ var _upload_upload_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload/upload.js */ "./src/commands/upload/upload.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleGameUpload", function() { return _upload_upload_js__WEBPACK_IMPORTED_MODULE_2__["handleGameUpload"]; });\n\n/* harmony import */ var _search_search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search/search.js */ "./src/commands/search/search.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "searchGame", function() { return _search_search_js__WEBPACK_IMPORTED_MODULE_3__["searchGame"]; });\n\n/* harmony import */ var _edit_edit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit/edit.js */ "./src/commands/edit/edit.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleGameEdit", function() { return _edit_edit_js__WEBPACK_IMPORTED_MODULE_4__["handleGameEdit"]; });\n\n/* harmony import */ var _help_help_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./help/help.js */ "./src/commands/help/help.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEmbeddedHelper", function() { return _help_help_js__WEBPACK_IMPORTED_MODULE_5__["createEmbeddedHelper"]; });\n\n/* harmony import */ var _images_images__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/images */ "./src/commands/images/images.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeQrImagesfromDB", function() { return _images_images__WEBPACK_IMPORTED_MODULE_6__["makeQrImagesfromDB"]; });\n\n/* harmony import */ var _checkurls_checkurls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./checkurls/checkurls */ "./src/commands/checkurls/checkurls.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlStatus", function() { return _checkurls_checkurls__WEBPACK_IMPORTED_MODULE_7__["urlStatus"]; });\n\n/* harmony import */ var _updatesize_updatesize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./updatesize/updatesize */ "./src/commands/updatesize/updatesize.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateSize", function() { return _updatesize_updatesize__WEBPACK_IMPORTED_MODULE_8__["updateSize"]; });\n\n/* harmony import */ var _headpat_headpat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./headpat/headpat */ "./src/commands/headpat/headpat.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headPat", function() { return _headpat_headpat__WEBPACK_IMPORTED_MODULE_9__["headPat"]; });\n\n/* harmony import */ var _findcovers_findcovers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./findcovers/findcovers */ "./src/commands/findcovers/findcovers.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findCovers", function() { return _findcovers_findcovers__WEBPACK_IMPORTED_MODULE_10__["findCovers"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/commands/index.js?'
        );

        /***/
      },

    /***/ "./src/commands/invoke/invoke.js":
      /*!***************************************!*\
  !*** ./src/commands/invoke/invoke.js ***!
  \***************************************/
      /*! exports provided: changeInvokeCommand */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeInvokeCommand", function() { return changeInvokeCommand; });\nfunction changeInvokeCommand(\n  messageArguments,\n  receivedMessage,\n  serverInvokers\n) {\n  if (receivedMessage.channel.type === "dm") {\n    return receivedMessage.channel.send(\n      `This command is available only in servers`\n    );\n  }\n\n  if (messageArguments.length > 3) {\n    return receivedMessage.channel.send(\n      `Too much arguments for invoke command`\n    );\n  }\n\n  if (messageArguments[1]) {\n    serverInvokers.set(receivedMessage.guild.id, messageArguments[1]);\n    return receivedMessage.channel.send(\n      `Successfully changed your invoke command`\n    );\n  }\n}\n\n\n//# sourceURL=webpack:///./src/commands/invoke/invoke.js?'
        );

        /***/
      },

    /***/ "./src/commands/scrap/scrap.js":
      /*!*************************************!*\
  !*** ./src/commands/scrap/scrap.js ***!
  \*************************************/
      /*! exports provided: scrapChannelForQrCodes */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrapChannelForQrCodes", function() { return scrapChannelForQrCodes; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-fetch */ "node-fetch");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jimp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimp */ "jimp");\n/* harmony import */ var jimp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jimp__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var qrcode_reader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qrcode-reader */ "qrcode-reader");\n/* harmony import */ var qrcode_reader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qrcode_reader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n\n\n\n\n\n\nasync function scrapChannelForQrCodes(\n  messageArguments,\n  receivedMessage\n) {\n  if (receivedMessage.channel.type === "dm") {\n    return receivedMessage.channel.send(\n      `This command is available only in servers`\n    );\n  }\n  try {\n    await receivedMessage.author.send(`Starting scrapping`);\n    Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["limitlessFetchMessages"])(receivedMessage.channel).then(async messages => {\n      for (const item of messages) {\n        if (!!item.attachments.size) {\n          let metaInformation = item.content.match(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].SCRAPER);\n          if (metaInformation) {\n            metaInformation = metaInformation\n              .map(Function.prototype.call, String.prototype.trim)\n              .filter(function(el) {\n                if (el !== null && el !== " ") return el;\n              });\n          } else {\n            continue;\n          }\n\n          let name = metaInformation[0];\n\n          if (!name) {\n          } else {\n            name = name.replace(/^"(.*)"$/, "$1").replace(/\'/g, "\'\'");\n          }\n          metaInformation.shift();\n          const { rows } = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_4__["findGame"])(name);\n          if (rows.length) {\n            console.log("Game is already in DB " + name + " Skipping...");\n            continue;\n          }\n\n          const regionIndex = metaInformation.findIndex(value =>\n            _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].REGIONS.test(value)\n          );\n          const platformIndex = metaInformation.findIndex(value =>\n            _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].PLATFORMS.test(value)\n          );\n          const sizeIndex = metaInformation.findIndex(value =>\n            _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].SIZE.test(value)\n          );\n\n          const res = await node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(\n            `${item.attachments.values().next().value.proxyURL}`\n          );\n          const buffer = await res.buffer();\n\n          const img = await jimp__WEBPACK_IMPORTED_MODULE_2___default.a.read(buffer).catch(e => {\n            console.log(e);\n          });\n          if (!img) {\n            continue;\n          }\n          const qr = await new qrcode_reader__WEBPACK_IMPORTED_MODULE_3___default.a();\n\n          const value = await new Promise((resolve, reject) => {\n            qr.callback = (err, v) => {\n              err != null ? reject(err) : resolve(v);\n            };\n            qr.decode(img.bitmap);\n          }).catch(e => {\n            console.log(e);\n          });\n\n          const obj = {\n            name: name,\n            qr_link: value.result,\n            qr_data: await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createASCIIQrCode"])(value.result),\n            qr_image_url: null,\n            platform: metaInformation[platformIndex] || "3DS",\n            region: metaInformation[regionIndex] || "N/A",\n            size: metaInformation[sizeIndex] || "N/A",\n            uploader_discord_id: item.author.id,\n            uploader_name: item.author.username\n          };\n\n          if (!rows.length) {\n            try {\n              await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_4__["createQree"])(\n                obj.qr_data,\n                obj.qr_image_url,\n                obj.qr_link,\n                obj.name,\n                obj.platform,\n                obj.region,\n                obj.size,\n                obj.uploader_discord_id,\n                obj.uploader_name\n              );\n              console.log("Saving in database! " + obj.name);\n            } catch (e) {\n              console.log(e);\n              await receivedMessage.author.send(\n                "something went wrong, send it to developer: \\n" +\n                  "```diff\\n- " +\n                  e +\n                  "```"\n              );\n            }\n          }\n        }\n      }\n    });\n  } catch (e) {\n    console.log(e);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/commands/scrap/scrap.js?'
        );

        /***/
      },

    /***/ "./src/commands/search/search.js":
      /*!***************************************!*\
  !*** ./src/commands/search/search.js ***!
  \***************************************/
      /*! exports provided: searchGame */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchGame", function() { return searchGame; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n\n\n\nasync function searchGame(messageArguments, receivedMessage) {\n  try {\n    // remove "search" from first element of array\n    let args = messageArguments.split(" ");\n    args.splice(0, 1);\n    let finalArgs = args.join(" ");\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["findGame"])(finalArgs);\n    if (rows.length === 0) {\n      if (Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["checkIfDM"])(receivedMessage)) {\n        return await receivedMessage.channel.send(\n          `I didn\'t find anything called \\`${finalArgs}\\` in my database. If you want to request games join https://discord.gg/tXJfdNp`\n        );\n      } else {\n        return await receivedMessage.channel.send(\n          `I didn\'t find anything called \\`${finalArgs}\\` in my database. You can request game on <#582262747937505290> channel`\n        );\n      }\n    } else {\n      const response = await receivedMessage.channel.send(`wait a moment...`);\n      const loadingMessageId = response.id;\n\n      const QrCodesSearchResults = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["createEmbeddedAnswer"])(\n        rows,\n        receivedMessage,\n        loadingMessageId\n      );\n      await QrCodesSearchResults.build();\n    }\n  } catch (e) {\n    console.log(e);\n    await receivedMessage.channel.send(\n      `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\n    );\n  }\n}\n\n\n//# sourceURL=webpack:///./src/commands/search/search.js?'
        );

        /***/
      },

    /***/ "./src/commands/updatesize/updatesize.js":
      /*!***********************************************!*\
  !*** ./src/commands/updatesize/updatesize.js ***!
  \***********************************************/
      /*! exports provided: updateSize */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSize", function() { return updateSize; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prettysize */ "prettysize");\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prettysize__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nasync function updateSize() {\n  const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["getWholeDB"])();\n  for (const { id, qr_link, name, region } of rows) {\n    try {\n      console.log(`starting scanning ${name}`);\n      const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.head(qr_link, { timeout: 15000 });\n      if (response && response.status !== 404) {\n        let found_region;\n        if (response.headers["content-disposition"]) {\n          found_region = response.headers["content-disposition"].match(\n            /\\b\\w*USA|JPN|EUR|GLOBAL|HACK|RF\\w*\\b/i\n          );\n        }\n\n        if (response.headers["content-length"]) {\n          await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["updateSizeArgument"])(\n            id,\n            prettysize__WEBPACK_IMPORTED_MODULE_2___default()(response.headers["content-length"], true)\n          );\n          console.log(\n            prettysize__WEBPACK_IMPORTED_MODULE_2___default()(response.headers["content-length"], true),\n            name,\n            id\n          );\n        }\n\n        if (found_region && region === "N/A") {\n          console.log(found_region[0]);\n          await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["updateRegionArgument"])(id, found_region[0]);\n        }\n      }\n    } catch (e) {\n      if (e.response) {\n        console.log(e.response.status);\n      } else {\n        console.log(e);\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/commands/updatesize/updatesize.js?'
        );

        /***/
      },

    /***/ "./src/commands/upload/upload.js":
      /*!***************************************!*\
  !*** ./src/commands/upload/upload.js ***!
  \***************************************/
      /*! exports provided: handleGameUpload */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleGameUpload", function() { return handleGameUpload; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! image-data-uri */ "image-data-uri");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(image_data_uri__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nasync function handleGameUpload(\n  messageArguments,\n  receivedMessage,\n  client\n) {\n  try {\n    if (messageArguments.length !== 5) {\n      return receivedMessage.channel.send(\n        `invalid arguments count for upload command`\n      );\n    }\n    const meme = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["getRandomMeme"])("head-pat-anime");\n    const response = await receivedMessage.channel.send(`wait a moment...`, {\n      files: [meme]\n    });\n    const loadingMessageId = response.id;\n\n    const regexesObj = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["filteredRegexes"])([\n      "URL",\n      "TITLE",\n      "REGIONS",\n      "PLATFORMS"\n    ]);\n\n    let foundArgsObj = {};\n    for (const regex in regexesObj) {\n      const itemIndex = await messageArguments.findIndex(value =>\n        regexesObj[regex].test(value)\n      );\n      if (itemIndex === -1) {\n        return await receivedMessage.channel.send(\n          `invalid arguments \\`${regex}\\` for upload command`\n        );\n      } else {\n        foundArgsObj[regex] = messageArguments[itemIndex];\n        messageArguments.splice(itemIndex, 1);\n      }\n    }\n\n    const obj = {\n      name: foundArgsObj.TITLE.replace(/[\'"]+/g, ""),\n      qr_link: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL),\n      qr_data: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createASCIIQrCode"])(Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL)),\n      qr_image_url: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createDataURLQrCode"])(Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL)),\n      platform: foundArgsObj.PLATFORMS,\n      region: foundArgsObj.REGIONS,\n      size: await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["checkFileSize"])(Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL)),\n      uploader_discord_id: receivedMessage.author.id,\n      uploader_name: receivedMessage.author.username\n    };\n\n    let string = obj.name + obj.platform + obj.region + obj.uploader_discord_id;\n    string = string.replace(/[^a-z0-9]/gim, "").replace(/\\s+/g, "");\n    await image_data_uri__WEBPACK_IMPORTED_MODULE_3___default.a.outputFile(obj.qr_image_url, "./img/" + string + ".jpg");\n\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["findGame"])(obj.name);\n    const text =\n      rows.length === 0\n        ? `\\`\\`\\`diff\\n+ This is how it will look, save in database? Type \'yes\'/\'no\'\\n\\`\\`\\``\n        : `\\`\\`\\`diff\\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING \'yes\' BY TYPING \'search\'"\\n\\`\\`\\`\\`\\`\\`diff\\n+ This is how it will look, save in database? Type \'yes\'/\'no\' or \'search\' if you want to check about what games I was talking about :)"\\n\\`\\`\\``;\n    // delete loading message\n    setTimeout(async () => {\n      receivedMessage.channel.messages.get(loadingMessageId).delete();\n\n      await receivedMessage.channel\n        .send("", {\n          files: ["./img/" + string + ".jpg"]\n        })\n        .then(msg => {\n          obj.qr_image_url = msg.attachments.values().next().value.proxyURL;\n        });\n\n      await receivedMessage.channel.send(\n        `\\`\\`\\`\\nLink: ${obj.qr_link}\\n\\nName: ${obj.name}\\nPlatform: ${obj.platform}\\nRegion: ${obj.region}\\nSize: ${obj.size}\\nUploader: ${obj.uploader_name}\\`\\`\\`${text}`\n      );\n    }, 3000);\n\n    const collector = new discord_js__WEBPACK_IMPORTED_MODULE_2__["MessageCollector"](\n      receivedMessage.channel,\n      m => m.author.id === receivedMessage.author.id,\n      { time: 60000 }\n    );\n\n    collector.on("collect", async message => {\n      if (message.content.toLowerCase() === "yes") {\n        collector.stop();\n        try {\n          obj.id = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["createQree"])(obj, receivedMessage);\n          const gameThumbnail = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["getGameCover"])(obj.id, obj.name);\n          const qrCodesSubscription = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["sendToQrGames"])(\n            obj,\n            receivedMessage,\n            client,\n            gameThumbnail\n          );\n          await qrCodesSubscription.build();\n        } catch (e) {\n          console.log(e);\n          await receivedMessage.channel.send(\n            `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\n          );\n        }\n      } else if (message.content.toLowerCase() === "no") {\n        collector.stop();\n\n        try {\n          await receivedMessage.channel.send("Ok try again later :P");\n        } catch (e) {\n          console.log(e);\n          await receivedMessage.channel.send(\n            `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\n          );\n        }\n      } else if (message.content.toLowerCase() === "search") {\n        try {\n          await receivedMessage.channel.send(\n            `\\`\\`\\`Ok, displaying games that I have found you can type \'yes\'/\'no\' still\\`\\`\\`\\``\n          );\n\n          const QrCodesSearchResults = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createEmbeddedAnswer"])(\n            rows,\n            receivedMessage\n          );\n          await QrCodesSearchResults.build();\n        } catch (e) {\n          console.log(e);\n          await receivedMessage.channel.send(\n            `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\n          );\n        }\n      }\n    });\n\n    collector.on("end", async () => {\n      await receivedMessage.channel.send("upload session ended");\n    });\n  } catch (e) {\n    console.log(e);\n    await receivedMessage.channel.send(\n      `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\n    );\n  }\n}\n\n\n//# sourceURL=webpack:///./src/commands/upload/upload.js?'
        );

        /***/
      },

    /***/ "./src/db/db_qree.js":
      /*!***************************!*\
  !*** ./src/db/db_qree.js ***!
  \***************************/
      /*! exports provided: createQree, editQree, findGame, findGameToEdit, approxQrCount, getWholeDB, updateQrImageUrl, updateSizeArgument, updateThumbnail, updateRegionArgument */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createQree", function() { return createQree; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editQree", function() { return editQree; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findGame", function() { return findGame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findGameToEdit", function() { return findGameToEdit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "approxQrCount", function() { return approxQrCount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWholeDB", function() { return getWholeDB; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateQrImageUrl", function() { return updateQrImageUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSizeArgument", function() { return updateSizeArgument; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateThumbnail", function() { return updateThumbnail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateRegionArgument", function() { return updateRegionArgument; });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n\ndotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();\n// import { Sequelize } from "sequelize";\n// import db from "../../models"\nconst QreItems = __webpack_require__(/*! ../../models/qreitems */ "./models/qreitems.js")\n\n// const Op = Sequelize.Op;\n// db.sequelize.sync()\n//   .then(() => console.log(\'Database connected & synched.\'))\n//   .catch(err => console.error(\'Unable to connect to the database:\', err));\n// const sequelize = new Sequelize(process.env.DATABASE_URL);\n// console.log(QreItems(sequelize))\n//\n// sequelize\n//   .authenticate()\n//   .then(() => {\n//     console.log("sequelize -> Connection has been established successfully.");\n//   })\n//   .catch(err => {\n//     console.error("sequelize -> Unable to connect to the database:", err);\n//   });\n\n// class QreItems extends Sequelize.Model {}\n// QreItems.init(\n//   {\n//     id: {\n//       type: Sequelize.INTEGER,\n//       autoIncrement: true,\n//       allowNull: false,\n//       primaryKey: true\n//     },\n//     qr_data: {\n//       type: Sequelize.TEXT,\n//       allowNull: false\n//     },\n//     qr_image_url: {\n//       type: Sequelize.TEXT,\n//       allowNull: false\n//     },\n//     qr_link: {\n//       type: Sequelize.STRING,\n//       allowNull: false\n//     },\n//     name: {\n//       type: Sequelize.STRING,\n//       allowNull: false\n//     },\n//     thumbnail: {\n//       type: Sequelize.STRING,\n//       allowNull: true\n//     },\n//     platform: {\n//       type: Sequelize.STRING,\n//       allowNull: false\n//     },\n//     region: {\n//       type: Sequelize.STRING,\n//       allowNull: false\n//     },\n//     size: {\n//       type: Sequelize.STRING,\n//       allowNull: false\n//     },\n//     uploader_discord_id: {\n//       type: Sequelize.STRING,\n//       allowNull: false\n//     },\n//     uploader_name: {\n//       type: Sequelize.STRING,\n//       allowNull: false\n//     }\n//   },\n//   {\n//     sequelize,\n//     modelName: "qre_items"\n//     // options\n//   }\n// );\n// sequelize.sync();\n\n// console.log(db.sequelize.models)\n\nasync function createQree(\n  {\n    qr_data,\n    qr_image_url,\n    qr_link,\n    name,\n    platform,\n    region,\n    size,\n    uploader_discord_id,\n    uploader_name\n  },\n  receivedMessage\n) {\n  try {\n    const item = await QreItems.create({\n      qr_data,\n      qr_image_url,\n      qr_link,\n      name,\n      platform,\n      region,\n      size,\n      uploader_discord_id,\n      uploader_name\n    });\n    await receivedMessage.channel.send("Saving in database!");\n    console.log("DB -> save qr in DB");\n    return item.id;\n  } catch (e) {\n    await receivedMessage.channel.send(\n      "something went wrong, send it to developer: \\n" +\n        "```diff\\n- " +\n        e +\n        "```"\n    );\n    console.log(e);\n  }\n}\n\nasync function editQree(\n  id,\n  {\n    qr_data,\n    qr_image_url,\n    qr_link,\n    name,\n    platform,\n    region,\n    uploader_discord_id,\n    uploader_name\n  },\n  newSize,\n  receivedMessage\n) {\n  try {\n    await QreItems.update(\n      {\n        qr_data,\n        qr_image_url,\n        qr_link,\n        name,\n        platform,\n        region,\n        newSize,\n        uploader_discord_id,\n        uploader_name\n      },\n      { where: { id } }\n    );\n    await receivedMessage.channel.send("Edited!");\n    console.log("DB -> save qr in DB");\n  } catch (e) {\n    await receivedMessage.channel.send(\n      "something went wrong, send it to developer: \\n" +\n        "```diff\\n- " +\n        e +\n        "```"\n    );\n    console.log(e);\n  }\n}\n\nasync function findGame(name) {\n  let filter = [];\n  let words = name.split(" ");\n  words.forEach(word => {\n    filter.push({\n      name: {\n        [Op.iLike]: `%${word}%`\n      }\n    });\n  });\n\n  try {\n    const res = await QreItems.findAll({\n      where: {\n        [Op.and]: filter\n      }\n    });\n    return res;\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function findGameToEdit(id) {\n  try {\n    const res = await QreItems.findAll({\n      where: {\n        id\n      },\n      limit: 1\n    });\n    return res;\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function approxQrCount() {\n  try {\n    return await QreItems.findAndCountAll();\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function getWholeDB() {\n  try {\n    return await QreItems.findAll();\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function updateQrImageUrl(id, qr_image_url) {\n  try {\n    await QreItems.update(\n      {\n        qr_image_url\n      },\n      { where: { id } }\n    );\n    console.log("DB -> updating qr url image");\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function updateSizeArgument(id, size) {\n  try {\n    const res = await QreItems.update(\n      {\n        size\n      },\n      { where: { id } }\n    );\n\n    console.log("DB -> updating size for id: " + id);\n    return res;\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function updateThumbnail(id, thumbnail) {\n  try {\n    const res = await QreItems.update(\n      {\n        thumbnail\n      },\n      { where: { id } }\n    );\n\n    console.log("DB -> updating thumbnail for id: " + id);\n    return res;\n  } catch (e) {\n    console.log(e);\n  }\n}\n\nasync function updateRegionArgument(id, region) {\n  try {\n    const res = await QreItems.update(\n      {\n        region\n      },\n      { where: { id } }\n    );\n\n    console.log("DB -> updating region for id: " + id);\n    return res;\n  } catch (e) {\n    console.log(e);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/db/db_qree.js?'
        );

        /***/
      },

    /***/ "./src/helpers/helpers.js":
      /*!********************************!*\
  !*** ./src/helpers/helpers.js ***!
  \********************************/
      /*! exports provided: parseDropboxLink, parseGDriveLink, parseURL, createASCIIQrCode, createDataURLQrCode, limitlessFetchMessages, createEmbeddedAnswer, sendToQrGames, checkIfDM, filteredRegexes, checkFileSize, getRandomMeme, validateGuilds, validatePermissions, validateAdmin, getGameCover, regexes */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDropboxLink", function() { return parseDropboxLink; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseGDriveLink", function() { return parseGDriveLink; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseURL", function() { return parseURL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createASCIIQrCode", function() { return createASCIIQrCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDataURLQrCode", function() { return createDataURLQrCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitlessFetchMessages", function() { return limitlessFetchMessages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmbeddedAnswer", function() { return createEmbeddedAnswer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToQrGames", function() { return sendToQrGames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkIfDM", function() { return checkIfDM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filteredRegexes", function() { return filteredRegexes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkFileSize", function() { return checkFileSize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomMeme", function() { return getRandomMeme; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateGuilds", function() { return validateGuilds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatePermissions", function() { return validatePermissions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateAdmin", function() { return validateAdmin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGameCover", function() { return getGameCover; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regexes", function() { return regexes; });\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qrcode-generator */ "qrcode-generator");\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qrcode_generator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! discord-paginationembed */ "discord-paginationembed");\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prettysize */ "prettysize");\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prettysize__WEBPACK_IMPORTED_MODULE_5__);\n__webpack_require__(/*! dotenv */ "dotenv").config();\n\n\n\n\n\n\n\nfunction parseDropboxLink(link) {\n  let string = link;\n  string = string.split("/");\n  if (string[3] === "sh") {\n    return string.join("/");\n  } else {\n    string[5] = "?dl=1";\n    return string.join("/");\n  }\n}\n\nfunction parseGDriveLink(link) {\n  return link.replace(/\\/file\\/d\\/(.+)\\/(.+)/, "/uc?export=download&id=$1");\n}\n\nfunction parseURL(link) {\n  if (link && link.match(regexes.GDRIVE)) {\n    return (link = parseGDriveLink(link));\n  } else if (link && link.match(regexes.DROPBOX)) {\n    if (link.slice(-1) === "0" || link.slice(-1) === "1") {\n      link = parseDropboxLink(link);\n      link = link.match(/^(.*?)\\.?dl=1/gi);\n      return link[0];\n    }\n  } else {\n    return link;\n  }\n}\n\nfunction createASCIIQrCode(link) {\n  let qr = qrcode_generator__WEBPACK_IMPORTED_MODULE_0___default()(0, "L");\n  qr.addData(`${link}`);\n  qr.make();\n  return qr.createASCII(2, 1);\n}\n\nfunction createDataURLQrCode(link) {\n  let qr = qrcode_generator__WEBPACK_IMPORTED_MODULE_0___default()(0, "M");\n  qr.addData(`${link}`);\n  qr.make();\n  return qr.createDataURL(5, 5);\n}\n\nasync function limitlessFetchMessages(channel, limit = 9000) {\n  const sum_messages = [];\n  let last_id;\n\n  while (true) {\n    const options = { limit: 100 };\n    if (last_id) {\n      options.before = last_id;\n    }\n\n    const messages = await channel.messages.fetch(options);\n    sum_messages.push(...messages.array());\n    last_id = messages.last().id;\n\n    if (messages.size !== 100 || sum_messages >= limit) {\n      break;\n    }\n  }\n\n  return sum_messages;\n}\n\nasync function createEmbeddedAnswer(\n  args,\n  receivedMessage,\n  loadingMessageId,\n  destination\n) {\n  const embeds = [];\n  for (const {\n    id,\n    name,\n    platform,\n    region,\n    size,\n    uploader_name,\n    qr_image_url,\n    thumbnail\n  } of args) {\n    const gameThumbnail = thumbnail || (await getGameCover(name, id));\n    console.log(gameThumbnail);\n    embeds.push(\n      new discord_js__WEBPACK_IMPORTED_MODULE_2__["RichEmbed"]()\n        .setImage(qr_image_url)\n        .addField("Name: ", name, true)\n        .addField("DB ID: ", id, true)\n        .addField("Platform: ", platform, true)\n        .addField("Region: ", region, true)\n        .addField("Size: ", size)\n        .addField("QR:", "===================", true)\n        .addField("Author: ", uploader_name, true)\n        .setThumbnail(gameThumbnail)\n    );\n  }\n  await receivedMessage.channel.messages.get(loadingMessageId).delete();\n  return (\n    new discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__["Embeds"]()\n      .setArray(embeds)\n      .setAuthorizedUsers([receivedMessage.author.id])\n      .setChannel(\n        destination === "pm" ? receivedMessage.author : receivedMessage.channel\n      )\n      .setPageIndicator(true)\n      .setPage(1)\n      // Methods below are for customising all embeds\n      .setTitle("Qr Code 3DS games search collection")\n      .setFooter("Bot created by: ProPanek#0188")\n      .setColor(0x000000)\n      .setNavigationEmojis({\n        back: "◀",\n        jump: "↗",\n        forward: "▶",\n        delete: "🗑"\n      })\n      .setTimeout(600000)\n  );\n}\n\nfunction sendToQrGames(args, receivedMessage, client, gameThumbnail) {\n  const embeds = [];\n\n  embeds.push(\n    new discord_js__WEBPACK_IMPORTED_MODULE_2__["RichEmbed"]()\n      .setImage(args.qr_image_url)\n      .addField("Name: ", args.name, true)\n      // .addField("QR link: ", args.qr_link)\n      .addField("DB ID: ", args.id, true)\n      .addField("Platform: ", args.platform, true)\n      .addField("Region: ", args.region, true)\n      .addField("Size: ", args.size)\n      .addField("QR: ", "===================", true)\n      .addField("Author: ", args.uploader_name, true)\n      .setThumbnail(\n        gameThumbnail ||\n          `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`\n      )\n  );\n\n  return (\n    new discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__["Embeds"]()\n      .setArray(embeds)\n      .setPageIndicator(false)\n      .setAuthorizedUsers([])\n      .setChannel(client.channels.get(process.env.BOT_SUBSCRIPTION_CHANNEL))\n      .setPage(1)\n      // Methods below are for customising all embeds\n      .setTitle("QR Code 3DS games")\n      .setFooter("Bot created by: ProPanek#0188")\n      .setColor(0x000000)\n      .setDisabledNavigationEmojis(["ALL"])\n      .setTimeout(600000)\n  );\n}\n\nfunction checkIfDM(receivedMessage) {\n  return receivedMessage.channel.type === "dm";\n}\n\nfunction filteredRegexes(array) {\n  return Object.keys(regexes)\n    .filter(key => array.includes(key))\n    .reduce((obj, key) => {\n      obj[key] = regexes[key];\n      return obj;\n    }, {});\n}\n\nasync function checkFileSize(url) {\n  const urlMetadata = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.head(url, { timeout: 15000 });\n  if (urlMetadata && urlMetadata.status !== 404) {\n    if (urlMetadata.headers["content-length"]) {\n      return prettysize__WEBPACK_IMPORTED_MODULE_5___default()(urlMetadata.headers["content-length"], true);\n    }\n  }\n}\n\nasync function getRandomMeme(searchPhrase) {\n  const tenor = {\n    baseURL: "https://api.tenor.com/v1/random",\n    apiKey: "T64EWZS77O3H",\n    tag: searchPhrase,\n    rating: "medium"\n  };\n\n  let tenorURL = encodeURI(\n    `${tenor.baseURL}?key=${tenor.apiKey}&q=${tenor.tag}&contentfilter=${tenor.rating}&media_filter=minimal&limit=1`\n  );\n  const tenorResponse = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(tenorURL);\n  return tenorResponse.data.results[0].media[0].gif.url;\n}\n\nfunction validateGuilds(receivedMessage) {\n  if (!checkIfDM(receivedMessage)) {\n    return !!process.env.BOT_PERMISSIONS_GUILD.includes(\n      receivedMessage.guild.id\n    );\n  }\n}\n\nfunction validatePermissions(receivedMessage) {\n  if (!checkIfDM(receivedMessage)) {\n    return !!receivedMessage.member.roles.some(r =>\n      process.env.BOT_PERMISSIONS_ROLES.includes(r.name)\n    );\n  }\n}\n\nfunction validateAdmin(receivedMessage) {\n  if (!checkIfDM(receivedMessage)) {\n    return !!receivedMessage.member.roles.some(r =>\n      process.env.BOT_PERMISSIONS_ADMIN.includes(r.name)\n    );\n  }\n}\n\nasync function getGameCover(name, id) {\n  let config = {\n    headers: {\n      "user-key": process.env.IGDB_TOKEN,\n      Accepts: "application/json"\n    }\n  };\n  try {\n    const title = name.replace(/[^a-zA-Z0-9 ]/gm, "");\n    const game = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(\n      `https://api-v3.igdb.com/games/?search=${title}}&fields=id,name,cover`,\n      config\n    );\n    if (!!game.data.length && typeof game.data[0].cover !== undefined) {\n      const cover = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(\n        `https://api-v3.igdb.com/covers/${game.data[0].cover}/?fields=url`,\n        config\n      );\n      if (id) {\n        await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["updateThumbnail"])(id, `https:${cover.data[0].url}`);\n      }\n      return `https:${cover.data[0].url}`;\n    } else {\n      console.log("setting default cover");\n      return `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`;\n    }\n  } catch (error) {\n    console.log(error.description);\n  }\n}\n\nconst regexes = {\n  DROPBOX: /\\b(\\w*dropbox\\w*)\\b/g,\n  CIA: /\\b(\\w*cia\\w*)\\b/g,\n  GDRIVE: /\\b(\\w*drive.google.com\\w*)\\b/g,\n  URL: /(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?/g,\n  ARGUMENTS: /\\b(\\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\\w*)\\b|(\\d+\\.?\\d+)\\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)|(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?|\\w+|"(?:\\\\"|[^"])+"|\\\'(?:\\\\\'|[^\'])+\'|\\“(?:\\\\“|[^“])+/gi,\n  TITLE: /"(?:\\\\"|[^"])+"|\\\'(?:\\\\\'|[^\'])+\'|\\“(?:\\\\“|[^“])+“/g,\n  REGIONS: /\\b\\w*USA|JPN|EUR|GLOBAL|HACK\\w*\\b/gi,\n  PLATFORMS: /\\b\\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\\w*\\b/g,\n  SIZE: /(\\d*\\.?\\d+)\\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)/gi,\n  SCRAPER: /\\b([^\\(]+)|\\((.*?)\\)|(\\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\\w*)\\b|(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?|\\w+|"(?:\\\\"|[^"])+"|\\\'(?:\\\\\'|[^\'])+\'|\\S+/gi\n};\n\n//(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?\\w+|"(?:\\\\"|[^"])+"|\'(?:\\\\\'|[^"])+\'|\\w+\n\n\n//# sourceURL=webpack:///./src/helpers/helpers.js?'
        );

        /***/
      },

    /***/ axios:
      /*!************************!*\
  !*** external "axios" ***!
  \************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("axios");\n\n//# sourceURL=webpack:///external_%22axios%22?'
        );

        /***/
      },

    /***/ "discord-paginationembed":
      /*!******************************************!*\
  !*** external "discord-paginationembed" ***!
  \******************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("discord-paginationembed");\n\n//# sourceURL=webpack:///external_%22discord-paginationembed%22?'
        );

        /***/
      },

    /***/ "discord.js":
      /*!*****************************!*\
  !*** external "discord.js" ***!
  \*****************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("discord.js");\n\n//# sourceURL=webpack:///external_%22discord.js%22?'
        );

        /***/
      },

    /***/ dotenv:
      /*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("dotenv");\n\n//# sourceURL=webpack:///external_%22dotenv%22?'
        );

        /***/
      },

    /***/ fs:
      /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("fs");\n\n//# sourceURL=webpack:///external_%22fs%22?'
        );

        /***/
      },

    /***/ "image-data-uri":
      /*!*********************************!*\
  !*** external "image-data-uri" ***!
  \*********************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("image-data-uri");\n\n//# sourceURL=webpack:///external_%22image-data-uri%22?'
        );

        /***/
      },

    /***/ jimp:
      /*!***********************!*\
  !*** external "jimp" ***!
  \***********************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("jimp");\n\n//# sourceURL=webpack:///external_%22jimp%22?'
        );

        /***/
      },

    /***/ "node-fetch":
      /*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("node-fetch");\n\n//# sourceURL=webpack:///external_%22node-fetch%22?'
        );

        /***/
      },

    /***/ prettysize:
      /*!*****************************!*\
  !*** external "prettysize" ***!
  \*****************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("prettysize");\n\n//# sourceURL=webpack:///external_%22prettysize%22?'
        );

        /***/
      },

    /***/ "qrcode-generator":
      /*!***********************************!*\
  !*** external "qrcode-generator" ***!
  \***********************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("qrcode-generator");\n\n//# sourceURL=webpack:///external_%22qrcode-generator%22?'
        );

        /***/
      },

    /***/ "qrcode-reader":
      /*!********************************!*\
  !*** external "qrcode-reader" ***!
  \********************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("qrcode-reader");\n\n//# sourceURL=webpack:///external_%22qrcode-reader%22?'
        );

        /***/
      }

    /******/
  }
);
