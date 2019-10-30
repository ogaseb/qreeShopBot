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
    /***/ "./server.js":
      /*!*******************!*\
  !*** ./server.js ***!
  \*******************/
      /*! no exports provided */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_commands_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/commands/index */ "./src/commands/index.js");\n/* harmony import */ var _src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var _src_db_db_qree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/db/db_qree */ "./src/db/db_qree.js");\n__webpack_require__(/*! dotenv */ "dotenv").config();\r\n\r\n\r\n\r\n\r\n\r\nprocess.on("unhandledRejection", (err, p) => {\r\n  console.log("An unhandledRejection occurred");\r\n  console.log(`Rejected Promise: ${p}`);\r\n  console.log(`Rejection: ${err}`);\r\n});\r\n\r\nconst client = new discord_js__WEBPACK_IMPORTED_MODULE_0__["Client"]();\r\nlet botInvoker = process.env.BOT_DEFAULT_INVOKE;\r\nlet serverInvokers = new Map();\r\n\r\nvoid (async function() {\r\n  try {\r\n    await client.login(process.env.BOT_TOKEN);\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n})();\r\n\r\nclient.on("ready", async () => {\r\n  console.log("On Discord!");\r\n  console.log("Connected as " + client.user.tag);\r\n  console.log("Servers:");\r\n  client.guilds.forEach(guild => {\r\n    serverInvokers.set(guild.id, botInvoker);\r\n    console.log(" - " + guild.id);\r\n    guild.channels.forEach(channel => {\r\n      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);\r\n    });\r\n\r\n    console.log(serverInvokers);\r\n  });\r\n\r\n  setInterval(async () => {\r\n    const qrCount = await Object(_src_db_db_qree__WEBPACK_IMPORTED_MODULE_3__["approxQrCount"])();\r\n    await client.user.setActivity(`QR Codes count: ${qrCount.count}`, {\r\n      type: "PLAYING"\r\n    });\r\n  }, 60000);\r\n\r\n  setInterval(async () => {\r\n    await Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["urlStatus"])(client);\r\n  }, 1000 * 60 * 60 * 24);\r\n});\r\n\r\nclient.on("message", receivedMessage => {\r\n  if (receivedMessage.author === client.user) {\r\n    return;\r\n  }\r\n\r\n  if (receivedMessage.channel.type === "dm") {\r\n    if (receivedMessage.content.startsWith(`${botInvoker}`)) {\r\n      processCommand(receivedMessage);\r\n    } else {\r\n      return receivedMessage.channel.send(\r\n        `You need to specify which command you want to use type "!qre help" to display available commands`\r\n      );\r\n    }\r\n  } else {\r\n    if (\r\n      receivedMessage.content.startsWith(\r\n        `${serverInvokers.get(receivedMessage.guild.id)}`\r\n      )\r\n    ) {\r\n      processCommand(receivedMessage);\r\n    }\r\n  }\r\n});\r\n\r\nfunction processCommand(receivedMessage) {\r\n  let fullCommand, primaryCommand;\r\n\r\n  Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkIfDM"])(receivedMessage)\r\n    ? (fullCommand = receivedMessage.content.substr(botInvoker.length + 1))\r\n    : (fullCommand = receivedMessage.content.substr(\r\n        serverInvokers.get(receivedMessage.guild.id).length + 1\r\n      ));\r\n\r\n  const messageArguments = fullCommand.match(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["regexes"].ARGUMENTS);\r\n\r\n  if (messageArguments !== null && messageArguments.length) {\r\n    primaryCommand = messageArguments[0]; // The first word directly after the exclamation is the command\r\n  }\r\n\r\n  console.log(primaryCommand);\r\n\r\n  if (!primaryCommand) {\r\n    Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkIfDM"])(receivedMessage)\r\n      ? receivedMessage.channel.send(\r\n          `You need to specify which command you want to use type "!qre help" to display available commands`\r\n        )\r\n      : receivedMessage.channel.send(\r\n          `You need to specify which command you want to use type "${serverInvokers.get(\r\n            receivedMessage.guild.id\r\n          )} help" to display available commands`\r\n        );\r\n  }\r\n\r\n  if (primaryCommand === "help") {\r\n    return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["createEmbeddedHelper"])(serverInvokers, receivedMessage).build();\r\n  }\r\n\r\n  if (primaryCommand === "search") {\r\n    return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["searchGame"])(fullCommand, receivedMessage);\r\n  }\r\n\r\n  if (primaryCommand === "headpat") {\r\n    Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateGuilds"])(receivedMessage)\r\n      ? Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["headPat"])(messageArguments, receivedMessage)\r\n      : null;\r\n  }\r\n\r\n  if (primaryCommand === "upload") {\r\n    if (\r\n      Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateGuilds"])(receivedMessage) &&\r\n      Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validatePermissions"])(receivedMessage)\r\n    ) {\r\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["handleGameUpload"])(messageArguments, receivedMessage, client);\r\n    } else {\r\n      return receivedMessage.channel.send(\r\n        `You need to have permissions to use this command`\r\n      );\r\n    }\r\n  }\r\n\r\n  if (Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateGuilds"])(receivedMessage) && Object(_src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["validateAdmin"])(receivedMessage)) {\r\n    if (primaryCommand === "invoke") {\r\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["changeInvokeCommand"])(\r\n        messageArguments,\r\n        receivedMessage,\r\n        serverInvokers\r\n      );\r\n    }\r\n\r\n    if (primaryCommand === "scrap") {\r\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["scrapChannelForQrCodes"])(messageArguments, receivedMessage);\r\n    }\r\n\r\n    if (primaryCommand === "images") {\r\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["makeQrImagesfromDB"])(messageArguments, receivedMessage);\r\n    }\r\n\r\n    if (primaryCommand === "edit") {\r\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["handleGameEdit"])(messageArguments, receivedMessage);\r\n    }\r\n\r\n    if (primaryCommand === "checkurls") {\r\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["urlStatus"])(client);\r\n    }\r\n\r\n    if (primaryCommand === "updatesize") {\r\n      return Object(_src_commands_index__WEBPACK_IMPORTED_MODULE_1__["updateSize"])(client);\r\n    }\r\n  }\r\n\r\n  return receivedMessage.channel.send(\r\n    `You need to specify which command you want to use type "!qre help" to display available commands`\r\n  );\r\n}\r\n\n\n//# sourceURL=webpack:///./server.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlStatus", function() { return urlStatus; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nasync function urlStatus(client) {\r\n  await client.channels\r\n    .get("604692367018033152")\r\n    .send(`Checking urls started... I will do it every 24 hours`);\r\n  const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["getWholeDB"])();\r\n  for (const { id, qr_link, name, uploader_discord_id } of rows) {\r\n    try {\r\n      console.time(`scanningTime - ${name}`);\r\n      await axios__WEBPACK_IMPORTED_MODULE_1___default.a.head(qr_link, { timeout: 30000 });\r\n      console.timeEnd(`scanningTime - ${name}`);\r\n    } catch (e) {\r\n      if (e.response) {\r\n        if (e.response.status === 404) {\r\n          await client.channels\r\n            .get("604692367018033152")\r\n            .send(\r\n              `${qr_link} sends ${e.response.status} respond code (not found or other error) for game: ${name}. DB ID for updating: ${id} . <@${uploader_discord_id}>`\r\n            );\r\n        }\r\n      } else {\r\n        await client.channels\r\n          .get("604692367018033152")\r\n          .send(\r\n            `${qr_link} sends error, but link probably works, check by clicking on it: ${name}. DB ID for updating: ${id} . <@${uploader_discord_id}>`\r\n          );\r\n      }\r\n    }\r\n  }\r\n  await client.channels\r\n    .get("604692367018033152")\r\n    .send(`All games have been scanned!`);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/checkurls/checkurls.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleGameEdit", function() { return handleGameEdit; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! image-data-uri */ "image-data-uri");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(image_data_uri__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\nasync function handleGameEdit(messageArguments, receivedMessage) {\r\n  try {\r\n    const id = parseInt(messageArguments[1]);\r\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["findGameToEdit"])(id);\r\n    const {\r\n      qr_data,\r\n      qr_image_url,\r\n      qr_link,\r\n      name,\r\n      platform,\r\n      region,\r\n      size,\r\n      uploader_discord_id,\r\n      uploader_name\r\n    } = rows[0];\r\n    if (rows.length) {\r\n      await receivedMessage.channel.send(\r\n        `\\`\\`\\`\\nLink: ${qr_link}\\n\\nName: ${name}\\nPlatform: ${platform}\\nRegion: ${region}\\nSize: ${size}\\nUploader: ${uploader_name}\\`\\`\\` \r\n        \\`\\`\\`Is this the game you wish to edit? type \'yes\'/\'no\'\\`\\`\\``,\r\n        {\r\n          files: [qr_image_url]\r\n        }\r\n      );\r\n\r\n      const collector = new discord_js__WEBPACK_IMPORTED_MODULE_1__["MessageCollector"](\r\n        receivedMessage.channel,\r\n        m => m.author.id === receivedMessage.author.id,\r\n        { time: 120000 }\r\n      );\r\n\r\n      collector.on("collect", async message => {\r\n        if (message.content.toLowerCase() === "yes") {\r\n          await receivedMessage.channel.send(\r\n            `\\`\\`\\`please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.\\`\\`\\`\r\n            \\`\\`\\`type \\`end\\` if you want to finish\\`\\`\\``\r\n          );\r\n        }\r\n        if (message.content.toLowerCase() === "no") {\r\n          collector.stop();\r\n          await receivedMessage.channel.send(\r\n            "``` Ok, will not do anything with it ```"\r\n          );\r\n        }\r\n\r\n        if (message.content.toLowerCase() === "end") {\r\n          collector.stop();\r\n        }\r\n      });\r\n\r\n      collector.on("end", async collected => {\r\n        let collectedArguments = [];\r\n        for (const item of collected) {\r\n          collectedArguments.push(item[1].content);\r\n        }\r\n\r\n        const args = collectedArguments\r\n          .filter(\r\n            function(e) {\r\n              return this.indexOf(e.toLowerCase()) < 0;\r\n            },\r\n            ["end", "yes", "no"]\r\n          )\r\n          .join(" ")\r\n          .match(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["regexes"].ARGUMENTS);\r\n\r\n        const regexesObj = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["filteredRegexes"])([\r\n          "URL",\r\n          "TITLE",\r\n          "REGIONS",\r\n          "PLATFORMS",\r\n          "SIZE"\r\n        ]);\r\n        let foundArgsObj = {};\r\n        for (const regex in regexesObj) {\r\n          console.log(regexesObj[regex]);\r\n          const itemIndex = args.findIndex(value =>\r\n            regexesObj[regex].test(value)\r\n          );\r\n          if (itemIndex === -1) {\r\n            await receivedMessage.channel.send(\r\n              `argument \\`${regex}\\` is missing continue...`\r\n            );\r\n          } else {\r\n            foundArgsObj[regex] = args[itemIndex];\r\n            args.splice(itemIndex, 1);\r\n            await receivedMessage.channel.send(\r\n              `argument \\`${regex}\\` is present! : \\`${foundArgsObj[regex]}\\``\r\n            );\r\n          }\r\n        }\r\n\r\n        console.log(foundArgsObj);\r\n\r\n        const obj = {\r\n          name: foundArgsObj.TITLE\r\n            ? foundArgsObj.TITLE.replace(/[\'"]+/g, "")\r\n            : name,\r\n          qr_link: foundArgsObj.URL ? foundArgsObj.URL : qr_link,\r\n          qr_data: foundArgsObj.URL\r\n            ? Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["createASCIIQrCode"])(foundArgsObj.URL)\r\n            : qr_data,\r\n          qr_image_url: foundArgsObj.URL\r\n            ? Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["createDataURLQrCode"])(foundArgsObj.URL)\r\n            : qr_image_url,\r\n          platform: foundArgsObj.PLATFORMS ? foundArgsObj.PLATFORMS : platform,\r\n          region: foundArgsObj.REGIONS ? foundArgsObj.REGIONS : region,\r\n          size: foundArgsObj.SIZE ? foundArgsObj.SIZE : size,\r\n          uploader_discord_id: uploader_discord_id,\r\n          uploader_name: uploader_name\r\n        };\r\n\r\n        let newSize = "";\r\n        if (foundArgsObj.URL) {\r\n          let string =\r\n            obj.name + obj.platform + obj.region + obj.uploader_discord_id;\r\n          string = string.replace(/[^a-z0-9]/gim, "");\r\n          await image_data_uri__WEBPACK_IMPORTED_MODULE_3___default.a.outputFile(\r\n            obj.qr_image_url,\r\n            "./img/" + string + ".jpg"\r\n          );\r\n\r\n          await receivedMessage.channel\r\n            .send("", {\r\n              files: ["./img/" + string + ".jpg"]\r\n            })\r\n            .then(msg => {\r\n              obj.qr_image_url = msg.attachments.values().next().value.proxyURL;\r\n            });\r\n\r\n          newSize = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkFileSize"])(foundArgsObj.URL);\r\n        }\r\n\r\n        await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["editQree"])(id, obj, newSize ? newSize : obj.size, receivedMessage);\r\n      });\r\n    } else {\r\n      await receivedMessage.channel.send("cant find it in database");\r\n    }\r\n  } catch (e) {\r\n    console.log(e);\r\n    await receivedMessage.channel.send(\r\n      "something went wrong, send it to developer: \\n" +\r\n        "```diff\\n- " +\r\n        e +\r\n        "```"\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/edit/edit.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headPat", function() { return headPat; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nasync function headPat(messageArgument, receivedMessage) {\r\n  if (messageArgument.length !== 2) {\r\n    return receivedMessage.channel.send(\r\n      `hey, specify who you want to headpat!`\r\n    );\r\n  }\r\n  receivedMessage.channel.messages.get(receivedMessage.id).delete();\r\n  const meme = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["getRandomMeme"])("head-pat-anime");\r\n  const embedHeadpat = new discord_js__WEBPACK_IMPORTED_MODULE_1__["RichEmbed"]()\r\n    .setColor(`${"#" + Math.floor(Math.random() * 16777215).toString(16)}`)\r\n    .setDescription(\r\n      `uwu *<@${receivedMessage.author.id}> headpats <@${messageArgument[1]}>*`\r\n    )\r\n    .setImage(meme);\r\n  receivedMessage.channel.send(embedHeadpat);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/headpat/headpat.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmbeddedHelper", function() { return createEmbeddedHelper; });\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! discord-paginationembed */ "discord-paginationembed");\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(discord_paginationembed__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n\r\n\r\n\r\n\r\nfunction createEmbeddedHelper(\r\n  serverInvokers,\r\n  receivedMessage,\r\n  destination\r\n) {\r\n  const embeds = [];\r\n\r\n  if (Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__["checkIfDM"])(receivedMessage)) {\r\n    embeds.push(\r\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\r\n        .addField("**COMMAND**: ", "```search```")\r\n        .addField(\r\n          "Description",\r\n          "```search -  It\'s available on channels and DM\'s, it will search for all games containing typed phrase. (emoji navigation in dm\'s is a little buggy but it works)```"\r\n        )\r\n        .addField("Command: ", \'```!qre search "<name>" ```\')\r\n        .addField("Example: ", \'```!qre search "Super Castlevania IV"```\')\r\n    );\r\n  } else {\r\n    embeds.push(\r\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\r\n        .addField("**COMMAND**: ", "```upload```")\r\n        .addField(\r\n          "Description",\r\n          "```upload - upload is available only in certain servers on " +\r\n            "Discord and only available to users containing special role(s). " +\r\n            "Remember about quotation marks in title of the game!```"\r\n        )\r\n        .addField(\r\n          "Arguments: ",\r\n          "```" +\r\n            "<platform> -  GBA, GBC, GAMEBOY, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO, VIRTUAL CONSOLE, MEGA DRIVE, SEGA GENESIS, MAME, TURBOGRAFX \\n\\n" +\r\n            "<regions> - USA, JPN, EUR, GLOBAL, HACK \\n\\n" +\r\n            "```"\r\n        )\r\n        .addField(\r\n          "Command: ",\r\n          "```" +\r\n            serverInvokers.get(receivedMessage.guild.id) +\r\n            \' upload <url> "<name>" <platform> <region>```\'\r\n        )\r\n\r\n        .addField(\r\n          "Example: ",\r\n          "```" +\r\n            serverInvokers.get(receivedMessage.guild.id) +\r\n            \' upload https://files.catbox.moe/au9pkx.cia "Super Castlevania IV" GBA USA```\'\r\n        )\r\n    );\r\n\r\n    embeds.push(\r\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\r\n        .addField("**COMMAND**: ", "```edit```")\r\n        .addField(\r\n          "Description",\r\n          "```edit - edit same as upload is available only in certain servers on " +\r\n            "Discord and only available to users containing special role(s). " +\r\n            "First you need to find the game you want to edit, just search it with search command and copy `DB ID` number" +\r\n            "then you proceed by typing edit command with this id ad you copied. After the game is found follow the instructions" +\r\n            "```"\r\n        )\r\n        .addField(\r\n          "Arguments: ",\r\n          "```" +\r\n            "<platform> - GBA, GBC, GAMEBOY, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO, VIRTUAL CONSOLE, MEGA DRIVE, SEGA GENESIS, MAME, TURBOGRAFX \\n\\n" +\r\n            "<regions> - USA, JPN, EUR, GLOBAL, HACK \\n\\n" +\r\n            "<size> - *KB, *MB, *GB \\n" +\r\n            "```"\r\n        )\r\n        .addField(\r\n          "Command: ",\r\n          "```" +\r\n            serverInvokers.get(receivedMessage.guild.id) +\r\n            " edit <id> ```"\r\n        )\r\n\r\n        .addField(\r\n          "Example: ",\r\n          "```" + serverInvokers.get(receivedMessage.guild.id) + " edit 10 ```"\r\n        )\r\n    );\r\n\r\n    embeds.push(\r\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\r\n        .addField("**COMMAND**: ", "```search```")\r\n        .addField(\r\n          "Description",\r\n          "```search -  It\'s available on channels and DM\'s, it will search for all games containing typed phrase. (emoji navigation in dm\'s is a little buggy but it works)```"\r\n        )\r\n        .addField(\r\n          "Command: ",\r\n          "```" +\r\n            serverInvokers.get(receivedMessage.guild.id) +\r\n            \' search "<name>" ```\'\r\n        )\r\n        .addField(\r\n          "Example: ",\r\n          "```" +\r\n            serverInvokers.get(receivedMessage.guild.id) +\r\n            \' search "Super Castlevania IV"```\'\r\n        )\r\n    );\r\n\r\n    embeds.push(\r\n      new discord_js__WEBPACK_IMPORTED_MODULE_0__["RichEmbed"]()\r\n        .addField("**COMMAND**: ", "```invoke```")\r\n        .addField(\r\n          "Description",\r\n          "```invoke - server only command which lets you change the command for invoking bot the default is always !qre```"\r\n        )\r\n        .addField(\r\n          "Command: ",\r\n          "```" +\r\n            serverInvokers.get(receivedMessage.guild.id) +\r\n            " invoke <new_command> ```"\r\n        )\r\n        .addField(\r\n          "Example: ",\r\n          "```" +\r\n            serverInvokers.get(receivedMessage.guild.id) +\r\n            "invoke %qre```"\r\n        )\r\n    );\r\n  }\r\n\r\n  return (\r\n    new discord_paginationembed__WEBPACK_IMPORTED_MODULE_1__["Embeds"]()\r\n      .setArray(embeds)\r\n      .setAuthorizedUsers([receivedMessage.author.id])\r\n      .setChannel(\r\n        destination === "pm" ? receivedMessage.author : receivedMessage.channel\r\n      )\r\n      .setPageIndicator(true)\r\n      .setPage(1)\r\n      // Methods below are for customising all embeds\r\n      .setTitle("Qr Code 3DS help")\r\n      .setDescription(\r\n        "=========================================================="\r\n      )\r\n      .addField(\r\n        "NOTE:",\r\n        "```links - you can provide direct link or normal sharing links from google and dropbox it will be automatically converted into direct ones```"\r\n      )\r\n      .setFooter("")\r\n      .setColor(0xffffff)\r\n      .setNavigationEmojis({\r\n        back: "◀",\r\n        jump: "↗",\r\n        forward: "▶",\r\n        delete: "🗑"\r\n      })\r\n      .setTimeout(600000)\r\n  );\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/help/help.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeQrImagesfromDB", function() { return makeQrImagesfromDB; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! image-data-uri */ "image-data-uri");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(image_data_uri__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\nasync function makeQrImagesfromDB(messageArguments, receivedMessage) {\r\n  try {\r\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["getWholeDB"])();\r\n    for (const {\r\n      id,\r\n      qr_image_url,\r\n      qr_link,\r\n      name,\r\n      platform,\r\n      region,\r\n      uploader_discord_id\r\n    } of rows) {\r\n      const obj = {\r\n        qr_image: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createDataURLQrCode"])(qr_link),\r\n        uploader_discord_id,\r\n        id\r\n      };\r\n\r\n      if (qr_image_url === "null") {\r\n        let string = name + platform + region + uploader_discord_id;\r\n        string = string.replace(/[^a-z0-9]/gim, "");\r\n        await image_data_uri__WEBPACK_IMPORTED_MODULE_2___default.a.outputFile(obj.qr_image, "./img/" + string + ".jpg");\r\n        fs__WEBPACK_IMPORTED_MODULE_3___default.a.access("./img/" + string + ".jpg", fs__WEBPACK_IMPORTED_MODULE_3___default.a.F_OK, async err => {\r\n          if (err) {\r\n            console.error(err);\r\n            return;\r\n          }\r\n          const msg = await receivedMessage.channel.send("", {\r\n            files: ["./img/" + string + ".jpg"]\r\n          });\r\n          // file exists\r\n          console.log(msg.attachments.values().next().value.proxyURL);\r\n          obj.qr_image = msg.attachments.values().next().value.proxyURL;\r\n          await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["updateQrImageUrl"])(obj.id, obj.qr_image);\r\n        });\r\n      }\r\n    }\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/images/images.js?'
        );

        /***/
      },

    /***/ "./src/commands/index.js":
      /*!*******************************!*\
  !*** ./src/commands/index.js ***!
  \*******************************/
      /*! exports provided: scrapChannelForQrCodes, changeInvokeCommand, handleGameUpload, searchGame, handleGameEdit, createEmbeddedHelper, makeQrImagesfromDB, urlStatus, updateSize, headPat */
      /***/ function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scrap_scrap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scrap/scrap.js */ "./src/commands/scrap/scrap.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrapChannelForQrCodes", function() { return _scrap_scrap_js__WEBPACK_IMPORTED_MODULE_0__["scrapChannelForQrCodes"]; });\n\n/* harmony import */ var _invoke_invoke_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoke/invoke.js */ "./src/commands/invoke/invoke.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeInvokeCommand", function() { return _invoke_invoke_js__WEBPACK_IMPORTED_MODULE_1__["changeInvokeCommand"]; });\n\n/* harmony import */ var _upload_upload_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload/upload.js */ "./src/commands/upload/upload.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleGameUpload", function() { return _upload_upload_js__WEBPACK_IMPORTED_MODULE_2__["handleGameUpload"]; });\n\n/* harmony import */ var _search_search_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search/search.js */ "./src/commands/search/search.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "searchGame", function() { return _search_search_js__WEBPACK_IMPORTED_MODULE_3__["searchGame"]; });\n\n/* harmony import */ var _edit_edit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit/edit.js */ "./src/commands/edit/edit.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleGameEdit", function() { return _edit_edit_js__WEBPACK_IMPORTED_MODULE_4__["handleGameEdit"]; });\n\n/* harmony import */ var _help_help_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./help/help.js */ "./src/commands/help/help.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createEmbeddedHelper", function() { return _help_help_js__WEBPACK_IMPORTED_MODULE_5__["createEmbeddedHelper"]; });\n\n/* harmony import */ var _images_images__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/images */ "./src/commands/images/images.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeQrImagesfromDB", function() { return _images_images__WEBPACK_IMPORTED_MODULE_6__["makeQrImagesfromDB"]; });\n\n/* harmony import */ var _checkurls_checkurls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./checkurls/checkurls */ "./src/commands/checkurls/checkurls.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlStatus", function() { return _checkurls_checkurls__WEBPACK_IMPORTED_MODULE_7__["urlStatus"]; });\n\n/* harmony import */ var _updatesize_updatesize__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./updatesize/updatesize */ "./src/commands/updatesize/updatesize.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateSize", function() { return _updatesize_updatesize__WEBPACK_IMPORTED_MODULE_8__["updateSize"]; });\n\n/* harmony import */ var _headpat_headpat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./headpat/headpat */ "./src/commands/headpat/headpat.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headPat", function() { return _headpat_headpat__WEBPACK_IMPORTED_MODULE_9__["headPat"]; });\n\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/commands/index.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeInvokeCommand", function() { return changeInvokeCommand; });\nfunction changeInvokeCommand(\r\n  messageArguments,\r\n  receivedMessage,\r\n  serverInvokers\r\n) {\r\n  if (receivedMessage.channel.type === "dm") {\r\n    return receivedMessage.channel.send(\r\n      `This command is available only in servers`\r\n    );\r\n  }\r\n\r\n  if (messageArguments.length > 3) {\r\n    return receivedMessage.channel.send(\r\n      `Too much arguments for invoke command`\r\n    );\r\n  }\r\n\r\n  if (messageArguments[1]) {\r\n    serverInvokers.set(receivedMessage.guild.id, messageArguments[1]);\r\n    return receivedMessage.channel.send(\r\n      `Successfully changed your invoke command`\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/invoke/invoke.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrapChannelForQrCodes", function() { return scrapChannelForQrCodes; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-fetch */ "node-fetch");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jimp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimp */ "jimp");\n/* harmony import */ var jimp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jimp__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var qrcode_reader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qrcode-reader */ "qrcode-reader");\n/* harmony import */ var qrcode_reader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qrcode_reader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n\r\n\r\n\r\n\r\n\r\n\r\nasync function scrapChannelForQrCodes(\r\n  messageArguments,\r\n  receivedMessage\r\n) {\r\n  if (receivedMessage.channel.type === "dm") {\r\n    return receivedMessage.channel.send(\r\n      `This command is available only in servers`\r\n    );\r\n  }\r\n  try {\r\n    await receivedMessage.author.send(`Starting scrapping`);\r\n    Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["limitlessFetchMessages"])(receivedMessage.channel).then(async messages => {\r\n      for (const item of messages) {\r\n        if (!!item.attachments.size) {\r\n          let metaInformation = item.content.match(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].SCRAPER);\r\n          if (metaInformation) {\r\n            metaInformation = metaInformation\r\n              .map(Function.prototype.call, String.prototype.trim)\r\n              .filter(function(el) {\r\n                if (el !== null && el !== " ") return el;\r\n              });\r\n          } else {\r\n            continue;\r\n          }\r\n\r\n          let name = metaInformation[0];\r\n\r\n          if (!name) {\r\n          } else {\r\n            name = name.replace(/^"(.*)"$/, "$1").replace(/\'/g, "\'\'");\r\n          }\r\n          metaInformation.shift();\r\n          const { rows } = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_4__["findGame"])(name);\r\n          if (rows.length) {\r\n            console.log("Game is already in DB " + name + " Skipping...");\r\n            continue;\r\n          }\r\n\r\n          const regionIndex = metaInformation.findIndex(value =>\r\n            _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].REGIONS.test(value)\r\n          );\r\n          const platformIndex = metaInformation.findIndex(value =>\r\n            _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].PLATFORMS.test(value)\r\n          );\r\n          const sizeIndex = metaInformation.findIndex(value =>\r\n            _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["regexes"].SIZE.test(value)\r\n          );\r\n\r\n          const res = await node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(\r\n            `${item.attachments.values().next().value.proxyURL}`\r\n          );\r\n          const buffer = await res.buffer();\r\n\r\n          const img = await jimp__WEBPACK_IMPORTED_MODULE_2___default.a.read(buffer).catch(e => {\r\n            console.log(e);\r\n          });\r\n          if (!img) {\r\n            continue;\r\n          }\r\n          const qr = await new qrcode_reader__WEBPACK_IMPORTED_MODULE_3___default.a();\r\n\r\n          const value = await new Promise((resolve, reject) => {\r\n            qr.callback = (err, v) => {\r\n              err != null ? reject(err) : resolve(v);\r\n            };\r\n            qr.decode(img.bitmap);\r\n          }).catch(e => {\r\n            console.log(e);\r\n          });\r\n\r\n          const obj = {\r\n            name: name,\r\n            qr_link: value.result,\r\n            qr_data: await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createASCIIQrCode"])(value.result),\r\n            qr_image_url: null,\r\n            platform: metaInformation[platformIndex] || "3DS",\r\n            region: metaInformation[regionIndex] || "N/A",\r\n            size: metaInformation[sizeIndex] || "N/A",\r\n            uploader_discord_id: item.author.id,\r\n            uploader_name: item.author.username\r\n          };\r\n\r\n          if (!rows.length) {\r\n            try {\r\n              await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_4__["createQree"])(\r\n                obj.qr_data,\r\n                obj.qr_image_url,\r\n                obj.qr_link,\r\n                obj.name,\r\n                obj.platform,\r\n                obj.region,\r\n                obj.size,\r\n                obj.uploader_discord_id,\r\n                obj.uploader_name\r\n              );\r\n              console.log("Saving in database! " + obj.name);\r\n            } catch (e) {\r\n              console.log(e);\r\n              await receivedMessage.author.send(\r\n                "something went wrong, send it to developer: \\n" +\r\n                  "```diff\\n- " +\r\n                  e +\r\n                  "```"\r\n              );\r\n            }\r\n          }\r\n        }\r\n      }\r\n    });\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/scrap/scrap.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchGame", function() { return searchGame; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n\r\n\r\n\r\nasync function searchGame(messageArguments, receivedMessage) {\r\n  try {\r\n    // remove "search" from first element of array\r\n    let args = messageArguments.split(" ");\r\n    args.splice(0, 1);\r\n    let finalArgs = args.join(" ");\r\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["findGame"])(finalArgs);\r\n    if (rows.length === 0) {\r\n      if (Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["checkIfDM"])(receivedMessage)) {\r\n        return await receivedMessage.channel.send(\r\n          `I didn\'t find anything called \\`${finalArgs}\\` in my database. If you want to request games join https://discord.gg/tXJfdNp`\r\n        );\r\n      } else {\r\n        return await receivedMessage.channel.send(\r\n          `I didn\'t find anything called \\`${finalArgs}\\` in my database. You can request game on <#582262747937505290> channel`\r\n        );\r\n      }\r\n    } else {\r\n      const meme = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["getRandomMeme"])("anime");\r\n      const response = await receivedMessage.channel.send(`wait a moment...`, {\r\n        files: [meme]\r\n      });\r\n      const loadingMessageId = response.id;\r\n\r\n      const QrCodesSearchResults = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__["createEmbeddedAnswer"])(\r\n        rows,\r\n        receivedMessage,\r\n        loadingMessageId\r\n      );\r\n      await QrCodesSearchResults.build();\r\n    }\r\n  } catch (e) {\r\n    console.log(e);\r\n    await receivedMessage.channel.send(\r\n      `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/search/search.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSize", function() { return updateSize; });\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prettysize */ "prettysize");\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prettysize__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\nasync function updateSize() {\r\n  const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["getWholeDB"])();\r\n  for (const { id, qr_link, name, region } of rows) {\r\n    try {\r\n      console.log(`starting scanning ${name}`);\r\n      const response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.head(qr_link, { timeout: 15000 });\r\n      if (response && response.status !== 404) {\r\n        let found_region;\r\n        if (response.headers["content-disposition"]) {\r\n          found_region = response.headers["content-disposition"].match(\r\n            /\\b\\w*USA|JPN|EUR|GLOBAL|HACK|RF\\w*\\b/i\r\n          );\r\n        }\r\n\r\n        if (response.headers["content-length"]) {\r\n          await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["updateSizeArgument"])(\r\n            id,\r\n            prettysize__WEBPACK_IMPORTED_MODULE_2___default()(response.headers["content-length"], true)\r\n          );\r\n          console.log(\r\n            prettysize__WEBPACK_IMPORTED_MODULE_2___default()(response.headers["content-length"], true),\r\n            name,\r\n            id\r\n          );\r\n        }\r\n\r\n        if (found_region && region === "N/A") {\r\n          console.log(found_region[0]);\r\n          await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_0__["updateRegionArgument"])(id, found_region[0]);\r\n        }\r\n      }\r\n    } catch (e) {\r\n      if (e.response) {\r\n        console.log(e.response.status);\r\n      } else {\r\n        console.log(e);\r\n      }\r\n    }\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/updatesize/updatesize.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleGameUpload", function() { return handleGameUpload; });\n/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/helpers */ "./src/helpers/helpers.js");\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! image-data-uri */ "image-data-uri");\n/* harmony import */ var image_data_uri__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(image_data_uri__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\nasync function handleGameUpload(\r\n  messageArguments,\r\n  receivedMessage,\r\n  client\r\n) {\r\n  try {\r\n    if (messageArguments.length !== 5) {\r\n      return receivedMessage.channel.send(\r\n        `invalid arguments count for upload command`\r\n      );\r\n    }\r\n    const meme = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["getRandomMeme"])("head-pat-anime");\r\n    const response = await receivedMessage.channel.send(`wait a moment...`, {\r\n      files: [meme]\r\n    });\r\n    const loadingMessageId = response.id;\r\n\r\n    const regexesObj = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["filteredRegexes"])([\r\n      "URL",\r\n      "TITLE",\r\n      "REGIONS",\r\n      "PLATFORMS"\r\n    ]);\r\n\r\n    let foundArgsObj = {};\r\n    for (const regex in regexesObj) {\r\n      const itemIndex = await messageArguments.findIndex(value =>\r\n        regexesObj[regex].test(value)\r\n      );\r\n      if (itemIndex === -1) {\r\n        return await receivedMessage.channel.send(\r\n          `invalid arguments \\`${regex}\\` for upload command`\r\n        );\r\n      } else {\r\n        foundArgsObj[regex] = messageArguments[itemIndex];\r\n        messageArguments.splice(itemIndex, 1);\r\n      }\r\n    }\r\n\r\n    const obj = {\r\n      name: foundArgsObj.TITLE.replace(/[\'"]+/g, ""),\r\n      qr_link: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL),\r\n      qr_data: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createASCIIQrCode"])(Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL)),\r\n      qr_image_url: Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createDataURLQrCode"])(Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL)),\r\n      platform: foundArgsObj.PLATFORMS,\r\n      region: foundArgsObj.REGIONS,\r\n      size: await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["checkFileSize"])(Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["parseURL"])(foundArgsObj.URL)),\r\n      uploader_discord_id: receivedMessage.author.id,\r\n      uploader_name: receivedMessage.author.username\r\n    };\r\n\r\n    let string = obj.name + obj.platform + obj.region + obj.uploader_discord_id;\r\n    string = string.replace(/[^a-z0-9]/gim, "").replace(/\\s+/g, "");\r\n    await image_data_uri__WEBPACK_IMPORTED_MODULE_3___default.a.outputFile(obj.qr_image_url, "./img/" + string + ".jpg");\r\n\r\n    const rows = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["findGame"])(obj.name);\r\n    const text =\r\n      rows.length === 0\r\n        ? `\\`\\`\\`diff\\n+ This is how it will look, save in database? Type \'yes\'/\'no\'\\n\\`\\`\\``\r\n        : `\\`\\`\\`diff\\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING \'yes\' BY TYPING \'search\'"\\n\\`\\`\\`\\`\\`\\`diff\\n+ This is how it will look, save in database? Type \'yes\'/\'no\' or \'search\' if you want to check about what games I was talking about :)"\\n\\`\\`\\``;\r\n    // delete loading message\r\n    setTimeout(async () => {\r\n      receivedMessage.channel.messages.get(loadingMessageId).delete();\r\n\r\n      await receivedMessage.channel\r\n        .send("", {\r\n          files: ["./img/" + string + ".jpg"]\r\n        })\r\n        .then(msg => {\r\n          obj.qr_image_url = msg.attachments.values().next().value.proxyURL;\r\n        });\r\n\r\n      await receivedMessage.channel.send(\r\n        `\\`\\`\\`\\nLink: ${obj.qr_link}\\n\\nName: ${obj.name}\\nPlatform: ${obj.platform}\\nRegion: ${obj.region}\\nSize: ${obj.size}\\nUploader: ${obj.uploader_name}\\`\\`\\`${text}`\r\n      );\r\n    }, 3000);\r\n\r\n    const collector = new discord_js__WEBPACK_IMPORTED_MODULE_2__["MessageCollector"](\r\n      receivedMessage.channel,\r\n      m => m.author.id === receivedMessage.author.id,\r\n      { time: 60000 }\r\n    );\r\n\r\n    collector.on("collect", async message => {\r\n      if (message.content.toLowerCase() === "yes") {\r\n        collector.stop();\r\n        try {\r\n          obj.id = await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["createQree"])(obj, receivedMessage);\r\n          const gameThumbnail = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["getGameCover"])(obj.id, obj.name);\r\n          const qrCodesSubscription = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["sendToQrGames"])(\r\n            obj,\r\n            receivedMessage,\r\n            client,\r\n            gameThumbnail\r\n          );\r\n          await qrCodesSubscription.build();\r\n        } catch (e) {\r\n          console.log(e);\r\n          await receivedMessage.channel.send(\r\n            `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\r\n          );\r\n        }\r\n      } else if (message.content.toLowerCase() === "no") {\r\n        collector.stop();\r\n\r\n        try {\r\n          await receivedMessage.channel.send("Ok try again later :P");\r\n        } catch (e) {\r\n          console.log(e);\r\n          await receivedMessage.channel.send(\r\n            `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\r\n          );\r\n        }\r\n      } else if (message.content.toLowerCase() === "search") {\r\n        try {\r\n          await receivedMessage.channel.send(\r\n            `\\`\\`\\`Ok, displaying games that I have found you can type \'yes\'/\'no\' still\\`\\`\\`\\``\r\n          );\r\n\r\n          const QrCodesSearchResults = await Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_0__["createEmbeddedAnswer"])(\r\n            rows,\r\n            receivedMessage\r\n          );\r\n          await QrCodesSearchResults.build();\r\n        } catch (e) {\r\n          console.log(e);\r\n          await receivedMessage.channel.send(\r\n            `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\r\n          );\r\n        }\r\n      }\r\n    });\r\n\r\n    collector.on("end", async () => {\r\n      await receivedMessage.channel.send("upload session ended");\r\n    });\r\n  } catch (e) {\r\n    console.log(e);\r\n    await receivedMessage.channel.send(\r\n      `something went wrong, send it to developer: \\n\\`\\`\\`diff\\n- ${e}\\`\\`\\``\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/commands/upload/upload.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createQree", function() { return createQree; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editQree", function() { return editQree; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findGame", function() { return findGame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findGameToEdit", function() { return findGameToEdit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "approxQrCount", function() { return approxQrCount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWholeDB", function() { return getWholeDB; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateQrImageUrl", function() { return updateQrImageUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSizeArgument", function() { return updateSizeArgument; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateThumbnail", function() { return updateThumbnail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateRegionArgument", function() { return updateRegionArgument; });\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sequelize */ "sequelize");\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\ndotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();\r\nconst Op = sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].Op;\r\n\r\nconst sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"](process.env.DATABASE_URL, {\r\n  define: { timestamps: false }\r\n});\r\n\r\nsequelize\r\n  .authenticate()\r\n  .then(() => {\r\n    console.log("sequelize -> Connection has been established successfully.");\r\n  })\r\n  .catch(err => {\r\n    console.error("sequelize -> Unable to connect to the database:", err);\r\n  });\r\n\r\nclass QreeItems extends sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].Model {}\r\nQreeItems.init(\r\n  {\r\n    id: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].INTEGER,\r\n      autoIncrement: true,\r\n      allowNull: false,\r\n      primaryKey: true\r\n    },\r\n    qr_data: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].TEXT,\r\n      allowNull: false\r\n    },\r\n    qr_image_url: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].TEXT,\r\n      allowNull: false\r\n    },\r\n    qr_link: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: false\r\n    },\r\n    name: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: false\r\n    },\r\n    thumbnail: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: true\r\n    },\r\n    platform: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: false\r\n    },\r\n    region: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: false\r\n    },\r\n    size: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: false\r\n    },\r\n    uploader_discord_id: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: false\r\n    },\r\n    uploader_name: {\r\n      type: sequelize__WEBPACK_IMPORTED_MODULE_1__["Sequelize"].STRING,\r\n      allowNull: false\r\n    }\r\n  },\r\n  {\r\n    sequelize,\r\n    modelName: "qre_items"\r\n    // options\r\n  }\r\n);\r\n\r\nsequelize.sync();\r\n\r\nasync function createQree(\r\n  {\r\n    qr_data,\r\n    qr_image_url,\r\n    qr_link,\r\n    name,\r\n    platform,\r\n    region,\r\n    size,\r\n    uploader_discord_id,\r\n    uploader_name\r\n  },\r\n  receivedMessage\r\n) {\r\n  try {\r\n    const item = await QreeItems.create({\r\n      qr_data,\r\n      qr_image_url,\r\n      qr_link,\r\n      name,\r\n      platform,\r\n      region,\r\n      size,\r\n      uploader_discord_id,\r\n      uploader_name\r\n    });\r\n    await receivedMessage.channel.send("Saving in database!");\r\n    console.log("DB -> save qr in DB");\r\n    return item.id;\r\n  } catch (e) {\r\n    await receivedMessage.channel.send(\r\n      "something went wrong, send it to developer: \\n" +\r\n        "```diff\\n- " +\r\n        e +\r\n        "```"\r\n    );\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function editQree(\r\n  id,\r\n  {\r\n    qr_data,\r\n    qr_image_url,\r\n    qr_link,\r\n    name,\r\n    platform,\r\n    region,\r\n    uploader_discord_id,\r\n    uploader_name\r\n  },\r\n  newSize,\r\n  receivedMessage\r\n) {\r\n  try {\r\n    await QreeItems.update(\r\n      {\r\n        qr_data,\r\n        qr_image_url,\r\n        qr_link,\r\n        name,\r\n        platform,\r\n        region,\r\n        newSize,\r\n        uploader_discord_id,\r\n        uploader_name\r\n      },\r\n      { where: { id } }\r\n    );\r\n    await receivedMessage.channel.send("Edited!");\r\n    console.log("DB -> save qr in DB");\r\n  } catch (e) {\r\n    await receivedMessage.channel.send(\r\n      "something went wrong, send it to developer: \\n" +\r\n        "```diff\\n- " +\r\n        e +\r\n        "```"\r\n    );\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function findGame(name) {\r\n  let filter = [];\r\n  let words = name.split(" ");\r\n  words.forEach(word => {\r\n    filter.push({\r\n      name: {\r\n        [Op.iLike]: `%${word}%`\r\n      }\r\n    });\r\n  });\r\n\r\n  try {\r\n    const res = await QreeItems.findAll({\r\n      where: {\r\n        [Op.and]: filter\r\n      }\r\n    });\r\n    return res;\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function findGameToEdit(id) {\r\n  try {\r\n    const res = await QreeItems.findAll({\r\n      where: {\r\n        id\r\n      },\r\n      limit: 1\r\n    });\r\n    return res;\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function approxQrCount() {\r\n  try {\r\n    return await QreeItems.findAndCountAll();\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function getWholeDB() {\r\n  try {\r\n    return await QreeItems.findAll();\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function updateQrImageUrl(id, qr_image_url) {\r\n  try {\r\n    await QreeItems.update(\r\n      {\r\n        qr_image_url\r\n      },\r\n      { where: { id } }\r\n    );\r\n    console.log("DB -> updating qr url image");\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function updateSizeArgument(id, size) {\r\n  try {\r\n    const res = await QreeItems.update(\r\n      {\r\n        size\r\n      },\r\n      { where: { id } }\r\n    );\r\n\r\n    console.log("DB -> updating size for id: " + id);\r\n    return res;\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function updateThumbnail(id, thumbnail) {\r\n  try {\r\n    const res = await QreeItems.update(\r\n      {\r\n        thumbnail\r\n      },\r\n      { where: { id } }\r\n    );\r\n\r\n    console.log("DB -> updating thumbnail for id: " + id);\r\n    return res;\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\r\nasync function updateRegionArgument(id, region) {\r\n  try {\r\n    const res = await QreeItems.update(\r\n      {\r\n        region\r\n      },\r\n      { where: { id } }\r\n    );\r\n\r\n    console.log("DB -> updating region for id: " + id);\r\n    return res;\r\n  } catch (e) {\r\n    console.log(e);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/db/db_qree.js?'
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
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDropboxLink", function() { return parseDropboxLink; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseGDriveLink", function() { return parseGDriveLink; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseURL", function() { return parseURL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createASCIIQrCode", function() { return createASCIIQrCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDataURLQrCode", function() { return createDataURLQrCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "limitlessFetchMessages", function() { return limitlessFetchMessages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmbeddedAnswer", function() { return createEmbeddedAnswer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToQrGames", function() { return sendToQrGames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkIfDM", function() { return checkIfDM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filteredRegexes", function() { return filteredRegexes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkFileSize", function() { return checkFileSize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomMeme", function() { return getRandomMeme; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateGuilds", function() { return validateGuilds; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatePermissions", function() { return validatePermissions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateAdmin", function() { return validateAdmin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGameCover", function() { return getGameCover; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regexes", function() { return regexes; });\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qrcode-generator */ "qrcode-generator");\n/* harmony import */ var qrcode_generator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qrcode_generator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db_db_qree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db/db_qree */ "./src/db/db_qree.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! discord.js */ "discord.js");\n/* harmony import */ var discord_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(discord_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! discord-paginationembed */ "discord-paginationembed");\n/* harmony import */ var discord_paginationembed__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prettysize */ "prettysize");\n/* harmony import */ var prettysize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prettysize__WEBPACK_IMPORTED_MODULE_5__);\n__webpack_require__(/*! dotenv */ "dotenv").config();\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction parseDropboxLink(link) {\r\n  let string = link;\r\n  string = string.split("/");\r\n  if (string[3] === "sh") {\r\n    return string.join("/");\r\n  } else {\r\n    string[5] = "?dl=1";\r\n    return string.join("/");\r\n  }\r\n}\r\n\r\nfunction parseGDriveLink(link) {\r\n  return link.replace(/\\/file\\/d\\/(.+)\\/(.+)/, "/uc?export=download&id=$1");\r\n}\r\n\r\nfunction parseURL(link) {\r\n  if (link && link.match(regexes.GDRIVE)) {\r\n    return (link = parseGDriveLink(link));\r\n  } else if (link && link.match(regexes.DROPBOX)) {\r\n    if (link.slice(-1) === "0" || link.slice(-1) === "1") {\r\n      link = parseDropboxLink(link);\r\n      link = link.match(/^(.*?)\\.?dl=1/gi);\r\n      return link[0];\r\n    }\r\n  } else {\r\n    return link;\r\n  }\r\n}\r\n\r\nfunction createASCIIQrCode(link) {\r\n  let qr = qrcode_generator__WEBPACK_IMPORTED_MODULE_0___default()(0, "L");\r\n  qr.addData(`${link}`);\r\n  qr.make();\r\n  return qr.createASCII(2, 1);\r\n}\r\n\r\nfunction createDataURLQrCode(link) {\r\n  let qr = qrcode_generator__WEBPACK_IMPORTED_MODULE_0___default()(0, "M");\r\n  qr.addData(`${link}`);\r\n  qr.make();\r\n  return qr.createDataURL(5, 5);\r\n}\r\n\r\nasync function limitlessFetchMessages(channel, limit = 9000) {\r\n  const sum_messages = [];\r\n  let last_id;\r\n\r\n  while (true) {\r\n    const options = { limit: 100 };\r\n    if (last_id) {\r\n      options.before = last_id;\r\n    }\r\n\r\n    const messages = await channel.messages.fetch(options);\r\n    sum_messages.push(...messages.array());\r\n    last_id = messages.last().id;\r\n\r\n    if (messages.size !== 100 || sum_messages >= limit) {\r\n      break;\r\n    }\r\n  }\r\n\r\n  return sum_messages;\r\n}\r\n\r\nasync function createEmbeddedAnswer(\r\n  args,\r\n  receivedMessage,\r\n  loadingMessageId,\r\n  destination\r\n) {\r\n  const embeds = [];\r\n  for (const {\r\n    id,\r\n    name,\r\n    platform,\r\n    region,\r\n    size,\r\n    uploader_name,\r\n    qr_image_url,\r\n    thumbnail\r\n  } of args) {\r\n    const gameThumbnail = thumbnail || (await getGameCover(name, id));\r\n    embeds.push(\r\n      new discord_js__WEBPACK_IMPORTED_MODULE_2__["RichEmbed"]()\r\n        .setImage(qr_image_url)\r\n        .addField("Name: ", name, true)\r\n        .addField("DB ID: ", id, true)\r\n        .addField("Platform: ", platform, true)\r\n        .addField("Region: ", region, true)\r\n        .addField("Size: ", size)\r\n        .addField("QR:", "===================", true)\r\n        .addField("Author: ", uploader_name, true)\r\n        .setThumbnail(gameThumbnail)\r\n    );\r\n  }\r\n  await receivedMessage.channel.messages.get(loadingMessageId).delete();\r\n  return (\r\n    new discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__["Embeds"]()\r\n      .setArray(embeds)\r\n      .setAuthorizedUsers([receivedMessage.author.id])\r\n      .setChannel(\r\n        destination === "pm" ? receivedMessage.author : receivedMessage.channel\r\n      )\r\n      .setPageIndicator(true)\r\n      .setPage(1)\r\n      // Methods below are for customising all embeds\r\n      .setTitle("Qr Code 3DS games search collection")\r\n      .setFooter("Bot created by: ProPanek#0188")\r\n      .setColor(0x000000)\r\n      .setNavigationEmojis({\r\n        back: "◀",\r\n        jump: "↗",\r\n        forward: "▶",\r\n        delete: "🗑"\r\n      })\r\n      .setTimeout(600000)\r\n  );\r\n}\r\n\r\nfunction sendToQrGames(args, receivedMessage, client, gameThumbnail) {\r\n  const embeds = [];\r\n\r\n  embeds.push(\r\n    new discord_js__WEBPACK_IMPORTED_MODULE_2__["RichEmbed"]()\r\n      .setImage(args.qr_image_url)\r\n      .addField("Name: ", args.name, true)\r\n      // .addField("QR link: ", args.qr_link)\r\n      .addField("DB ID: ", args.id, true)\r\n      .addField("Platform: ", args.platform, true)\r\n      .addField("Region: ", args.region, true)\r\n      .addField("Size: ", args.size)\r\n      .addField("QR: ", "===================", true)\r\n      .addField("Author: ", args.uploader_name, true)\r\n      .setThumbnail(\r\n        gameThumbnail ||\r\n          `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`\r\n      )\r\n  );\r\n\r\n  return (\r\n    new discord_paginationembed__WEBPACK_IMPORTED_MODULE_3__["Embeds"]()\r\n      .setArray(embeds)\r\n      .setPageIndicator(false)\r\n      .setAuthorizedUsers([])\r\n      .setChannel(client.channels.get(process.env.BOT_SUBSCRIPTION_CHANNEL))\r\n      .setPage(1)\r\n      // Methods below are for customising all embeds\r\n      .setTitle("QR Code 3DS games")\r\n      .setFooter("Bot created by: ProPanek#0188")\r\n      .setColor(0x000000)\r\n      .setDisabledNavigationEmojis(["ALL"])\r\n      .setTimeout(600000)\r\n  );\r\n}\r\n\r\nfunction checkIfDM(receivedMessage) {\r\n  return receivedMessage.channel.type === "dm";\r\n}\r\n\r\nfunction filteredRegexes(array) {\r\n  return Object.keys(regexes)\r\n    .filter(key => array.includes(key))\r\n    .reduce((obj, key) => {\r\n      obj[key] = regexes[key];\r\n      return obj;\r\n    }, {});\r\n}\r\n\r\nasync function checkFileSize(url) {\r\n  const urlMetadata = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.head(url, { timeout: 15000 });\r\n  if (urlMetadata && urlMetadata.status !== 404) {\r\n    if (urlMetadata.headers["content-length"]) {\r\n      return prettysize__WEBPACK_IMPORTED_MODULE_5___default()(urlMetadata.headers["content-length"], true);\r\n    }\r\n  }\r\n}\r\n\r\nasync function getRandomMeme(searchPhrase) {\r\n  const tenor = {\r\n    baseURL: "https://api.tenor.com/v1/random",\r\n    apiKey: "T64EWZS77O3H",\r\n    tag: searchPhrase,\r\n    rating: "medium"\r\n  };\r\n\r\n  let tenorURL = encodeURI(\r\n    `${tenor.baseURL}?key=${tenor.apiKey}&q=${tenor.tag}&contentfilter=${tenor.rating}&media_filter=minimal&limit=1`\r\n  );\r\n  const tenorResponse = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(tenorURL);\r\n  return tenorResponse.data.results[0].media[0].gif.url;\r\n}\r\n\r\nfunction validateGuilds(receivedMessage) {\r\n  if (!checkIfDM(receivedMessage)) {\r\n    return !!process.env.BOT_PERMISSIONS_GUILD.includes(\r\n      receivedMessage.guild.id\r\n    );\r\n  }\r\n}\r\n\r\nfunction validatePermissions(receivedMessage) {\r\n  if (!checkIfDM(receivedMessage)) {\r\n    return !!receivedMessage.member.roles.some(r =>\r\n      process.env.BOT_PERMISSIONS_ROLES.includes(r.name)\r\n    );\r\n  }\r\n}\r\n\r\nfunction validateAdmin(receivedMessage) {\r\n  if (!checkIfDM(receivedMessage)) {\r\n    return !!receivedMessage.member.roles.some(r =>\r\n      process.env.BOT_PERMISSIONS_ADMIN.includes(r.name)\r\n    );\r\n  }\r\n}\r\n\r\nasync function getGameCover(name, id) {\r\n  let config = {\r\n    headers: {\r\n      "user-key": process.env.IGDB_TOKEN,\r\n      Accepts: "application/json"\r\n    }\r\n  };\r\n  try {\r\n    const title = name.replace(/[^a-zA-Z0-9 ]/gm, "");\r\n    const game = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(\r\n      `https://api-v3.igdb.com/games/?search=${title}}&fields=id,name,cover`,\r\n      config\r\n    );\r\n    console.log(game.data[0].cover);\r\n    if (game.data.length) {\r\n      const cover = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(\r\n        `https://api-v3.igdb.com/covers/${game.data[0].cover}/?fields=url`,\r\n        config\r\n      );\r\n      console.log(cover.data[0].url);\r\n      if (id) {\r\n        await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["updateThumbnail"])(id, `https:${cover.data[0].url}`);\r\n      }\r\n      return `https:${cover.data[0].url}`;\r\n    } else {\r\n      if (id) {\r\n        console.log("setting default cover");\r\n        await Object(_db_db_qree__WEBPACK_IMPORTED_MODULE_1__["updateThumbnail"])(\r\n          id,\r\n          `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`\r\n        );\r\n        return `https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png`;\r\n      }\r\n    }\r\n  } catch (error) {\r\n    // console.log(error);\r\n  }\r\n}\r\n\r\nconst regexes = {\r\n  DROPBOX: /\\b(\\w*dropbox\\w*)\\b/g,\r\n  CIA: /\\b(\\w*cia\\w*)\\b/g,\r\n  GDRIVE: /\\b(\\w*drive.google.com\\w*)\\b/g,\r\n  URL: /(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?/g,\r\n  ARGUMENTS: /\\b(\\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\\w*)\\b|(\\d+\\.?\\d+)\\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)|(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?|\\w+|"(?:\\\\"|[^"])+"|\\\'(?:\\\\\'|[^\'])+\'|\\“(?:\\\\“|[^“])+/gi,\r\n  TITLE: /"(?:\\\\"|[^"])+"|\\\'(?:\\\\\'|[^\'])+\'|\\“(?:\\\\“|[^“])+“/g,\r\n  REGIONS: /\\b\\w*USA|JPN|EUR|GLOBAL|HACK\\w*\\b/gi,\r\n  PLATFORMS: /\\b\\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\\w*\\b/g,\r\n  SIZE: /(\\d*\\.?\\d+)\\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)/gi,\r\n  SCRAPER: /\\b([^\\(]+)|\\((.*?)\\)|(\\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\\w*)\\b|(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?|\\w+|"(?:\\\\"|[^"])+"|\\\'(?:\\\\\'|[^\'])+\'|\\S+/gi\r\n};\r\n\r\n//(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?\\w+|"(?:\\\\"|[^"])+"|\'(?:\\\\\'|[^"])+\'|\\w+\r\n\n\n//# sourceURL=webpack:///./src/helpers/helpers.js?'
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
      },

    /***/ sequelize:
      /*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        eval(
          'module.exports = require("sequelize");\n\n//# sourceURL=webpack:///external_%22sequelize%22?'
        );

        /***/
      }

    /******/
  }
);
