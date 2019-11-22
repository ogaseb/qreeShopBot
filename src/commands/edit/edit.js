require("dotenv").config();
const { createEmbeddedAnswer } = require("../../helpers/helpers");
const { editQree, findGameToEdit } = require("../../../controllers/qre_items");
const { MessageCollector } = require("discord.js");
const {
  checkFileSize,
  createASCIIQrCode,
  createDataURLQrCode,
  filteredRegexes,
  regexes
} = require("../../helpers/helpers");
const imageDataURI = require("image-data-uri");

module.exports.handleGameEdit = async function(
  messageArguments,
  receivedMessage
) {
  try {
    const id = parseInt(messageArguments[1]);
    const game = await findGameToEdit(id);
    const {
      qrData,
      qrImageUrl,
      qrLink,
      name,
      platform,
      region,
      size,
      uploaderDiscordId,
      uploaderName
    } = game;

    if (typeof game.dataValues != "undefined") {
      await receivedMessage.channel.send(
        `\`\`\`\nLink: ${qrLink}\n\nName: ${name}\nPlatform: ${platform}\nRegion: ${region}\nSize: ${size}\nUploader: ${uploaderName}\`\`\`\`\`\`Is this the game you wish to edit? type 'yes'/'no'\`\`\``,
        {
          files: [qrImageUrl]
        }
      );

      const collector = new MessageCollector(
        receivedMessage.channel,
        m => m.author.id === receivedMessage.author.id,
        { time: 120000 }
      );

      await collector.on("collect", async message => {
        if (message.content.toLowerCase() === "yes") {
          await receivedMessage.channel.send(
            `\`\`\`please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.\`\`\`\`\`\`type \`end\` if you want to finish\`\`\``
          );
        }
        if (message.content.toLowerCase() === "no") {
          collector.stop();
          await receivedMessage.channel.send(
            "``` Ok, will not do anything with it ```"
          );
        }

        if (message.content.toLowerCase() === "end") {
          collector.stop();
        }
      });

      await collector.on("end", async collected => {
        try {
          let collectedArguments = [];
          collected.forEach(item => {
            collectedArguments.push(item.content);
          });

          const args = await collectedArguments
            .filter(
              function(e) {
                return this.indexOf(e.toLowerCase()) < 0;
              },
              ["end", "yes", "no"]
            )
            .join(" ")
            .match(regexes.ARGUMENTS);

          console.log(args);

          if (args) {
            const regexesObj = await filteredRegexes([
              "URL",
              "TITLE",
              "REGIONS",
              "PLATFORMS",
              "SIZE"
            ]);

            let foundArgsObj = {};
            for (const regex in regexesObj) {
              if (regexesObj.hasOwnProperty(regex)) {
                console.log(regexesObj[regex], regex);

                const itemIndex = args.findIndex(value =>
                  value.match(regexesObj[regex])
                );
                console.log(itemIndex);

                if (itemIndex === -1) {
                  await receivedMessage.channel.send(
                    `argument \`${regex}\` is missing continue...`
                  );
                } else {
                  foundArgsObj[regex] = args[itemIndex];
                  console.log(itemIndex);
                  args.splice(itemIndex, 1);
                  await receivedMessage.channel.send(
                    `argument \`${regex}\` is present! : \`${foundArgsObj[regex]}\``
                  );
                }
              }
            }

            const obj = {
              name: foundArgsObj.TITLE
                ? foundArgsObj.TITLE.replace(/["]+/g, "")
                : name,
              qrLink: foundArgsObj.URL ? foundArgsObj.URL : qrLink,
              qrData: foundArgsObj.URL
                ? createASCIIQrCode(foundArgsObj.URL)
                : qrData,
              qrImageUrl: foundArgsObj.URL
                ? createDataURLQrCode(foundArgsObj.URL)
                : qrImageUrl,
              platform: foundArgsObj.PLATFORMS
                ? foundArgsObj.PLATFORMS
                : platform,
              region: foundArgsObj.REGIONS ? foundArgsObj.REGIONS : region,
              size: foundArgsObj.SIZE ? foundArgsObj.SIZE : size,
              uploaderDiscordId: uploaderDiscordId,
              uploaderName: uploaderName
            };

            let newSize = "";
            if (foundArgsObj.URL) {
              let string =
                obj.name + obj.platform + obj.region + obj.uploaderDiscordId;
              string = string.replace(/[^a-z0-9]/gim, "");
              await imageDataURI.outputFile(
                obj.qrImageUrl,
                "./img/" + string + ".jpg"
              );

              const imageMsg = await receivedMessage.channel.send("", {
                files: ["./img/" + string + ".jpg"]
              });
              obj.qrImageUrl = imageMsg.attachments
                .values()
                .next().value.proxyURL;

              newSize = await checkFileSize(foundArgsObj.URL);
            }

            await editQree(
              id,
              obj,
              newSize ? newSize : obj.size,
              receivedMessage
            );

            const check = await findGameToEdit(id, receivedMessage);
            await createEmbeddedAnswer(check).build();
          } else {
            await receivedMessage.channel.send(`Edit session ended`);
          }
        } catch (e) {
          console.log(e);
          await receivedMessage.channel.send(
            "something went wrong, send it to developer: \n" +
              "```diff\n- " +
              e +
              "```"
          );
        }
      });
    } else {
      await receivedMessage.channel.send("cant find it in database");
    }
  } catch (e) {
    console.log(e);
    await receivedMessage.channel.send(
      "something went wrong, send it to developer: \n" +
        "```diff\n- " +
        e +
        "```"
    );
  }
};
