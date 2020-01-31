const {
  createInitialObjectEdit
} = require("../../commands/edit/functions/createInitialObjectEdit");
const { editQree, findGameToEdit } = require("../../controllers/qree_items");

const {
  embedded: { sendToQrGames, createEmbeddedAnswer },
  other: { regexes }
} = require("../../helpers");
const { createQree } = require("../../controllers/qree_items");
const { MessageCollector } = require("discord.js");

const QrCollector = class QrCollector {
  constructor(
    receivedMessage,
    type,
    {
      time = 120000,
      client,
      qrGameObject,
      searchResult,
      messagesIdArray = []
    } = {}
  ) {
    const TYPE = ["upload", "edit"];
    if (!TYPE.includes(type)) {
      throw `you need to specify the type you want to use`;
    }
    this.receivedMessage = receivedMessage;
    this.client = client;
    this.messagesIdArray = messagesIdArray;
    this.time = time;
    this.type = type;
    this.qrGameObject = qrGameObject;
    this.searchResult = searchResult;
    this.collectorInstance = new MessageCollector(
      this.receivedMessage.channel,
      m => m.author.id === this.receivedMessage.author.id,
      { time: this.time }
    );
  }

  init() {
    this.collect();
    this.end();
  }

  clearMessages() {
    if (this.messagesIdArray.length) {
      this.messagesIdArray.forEach(async id => {
        await this.receivedMessage.channel.messages.get(id).delete();
      });
    }
  }

  collect() {
    this.collectorInstance.on("collect", async message => {
      try {
        switch (this.type) {
          case "upload": {
            this.messagesIdArray.push(message.id);
            if (message.content.toLowerCase() === "yes") {
              this.stop();
              this.qrGameObject.id = await createQree(
                this.qrGameObject,
                this.receivedMessage
              );
              await this.receivedMessage.channel
                .send("Saving in database!")
                .then(message => {
                  this.messagesIdArray.push(message.id);
                });
              await this.client.channels
                .get(process.env.BOT_FEED_CHANNEL)
                .send(
                  `@here added new game QR -- \nname: \`${this.qrGameObject.name}\`\nuploader: \`${this.qrGameObject.uploaderName}\``
                );

              const qrCodesSubscription = await sendToQrGames(
                this.qrGameObject,
                this.receivedMessage,
                this.client
              );
              await qrCodesSubscription.build();
            } else if (message.content.toLowerCase() === "no") {
              this.stop();

              // await this.receivedMessage.channel.send("Ok try again later :P");
            } else if (message.content.toLowerCase() === "search") {
              await this.receivedMessage.channel
                .send(
                  `\`\`\`Ok, displaying games that I have found you can type 'yes'/'no' still\`\`\``
                )
                .then(message => {
                  this.messagesIdArray.push(message.id);
                });

              const QrCodesSearchResults = await createEmbeddedAnswer(
                this.searchResult,
                this.receivedMessage
              );
              await QrCodesSearchResults.build();
            }
            break;
          }
          case "edit": {
            if (message.content.toLowerCase() === "yes") {
              this.receivedMessage.channel
                .send(
                  `\`\`\`please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.\`\`\`\`\`\`type \`end\` if you want to finish\`\`\``
                )
                .then(message => {
                  this.messagesIdArray.push(message.id);
                });
            }
            if (message.content.toLowerCase() === "no") {
              this.receivedMessage.channel
                .send("``` Ok, will not do anything with it ```")
                .then(message => {
                  this.messagesIdArray.push(message.id);
                });
              this.stop();
              setTimeout(() => {
                this.clearMessages();
              }, 1000);
            }

            if (message.content.toLowerCase() === "end") {
              this.stop();
            }
            break;
          }
        }
      } catch (e) {
        console.error(e);
        await this.receivedMessage.channel.send(
          `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
        );
      }
    });
    return this;
  }

  end(id = undefined, game = undefined) {
    this.collectorInstance.on("end", async collected => {
      try {
        switch (this.type) {
          case "upload":
            await this.receivedMessage.channel
              .send("upload session ended")
              .then(message => {
                this.messagesIdArray.push(message.id);
              });
            setTimeout(() => {
              this.clearMessages();
            }, 5000);
            break;
          case "edit":
            {
              let collectedArguments = [];
              collected.forEach(item => {
                this.messagesIdArray.push(item.id);
                collectedArguments.push(item.content);
              });
              const diffArguments = await collectedArguments
                .filter(
                  function(e) {
                    return this.indexOf(e.toLowerCase()) < 0;
                  },
                  ["end", "yes", "no"]
                )
                .join(" ")
                .match(regexes.ARGUMENTS);

              if (
                diffArguments &&
                collectedArguments[0].toLowerCase() === "yes"
              ) {
                const editGameObject = await createInitialObjectEdit(
                  diffArguments,
                  this.receivedMessage,
                  game
                );
                this.messagesIdArray = [
                  ...this.messagesIdArray,
                  ...editGameObject.messagesIdArray
                ];
                await editQree(id, editGameObject, this.receivedMessage);
                const check = await findGameToEdit(id);
                this.receivedMessage.channel
                  .send(
                    `\`\`\`\nUPDATED QR:\nLink: ${check.qrLink}\n\nName: ${check.name}\nPlatform: ${check.platform}\nRegion: ${check.region}\nSize: ${check.size}\nUploader: ${check.uploaderName}\`\`\``,
                    {
                      files: [check.qrImageUrl]
                    }
                  )
                  .then(message => {
                    this.messagesIdArray.push(message.id);
                  });

                setTimeout(() => {
                  this.clearMessages();
                }, 5000);
              }
            }
            break;
        }
      } catch (e) {
        console.error(e);
      }
    });
  }

  stop() {
    this.collectorInstance.stop();
  }
};

module.exports.QrCollector = QrCollector;
