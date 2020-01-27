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
    { time = 120000, client, qrGameObject, searchResult } = {}
  ) {
    const TYPE = ["upload", "edit"];
    if (!TYPE.includes(type)) {
      throw `you need to specify the type you want to use`;
    }
    this.receivedMessage = receivedMessage;
    this.client = client;
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

  collect() {
    this.collectorInstance.on("collect", async message => {
      try {
        switch (this.type) {
          case "upload": {
            if (message.content.toLowerCase() === "yes") {
              this.stop();
              this.qrGameObject.id = await createQree(
                this.qrGameObject,
                this.receivedMessage
              );
              await this.receivedMessage.channel.send("Saving in database!");
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
              await this.receivedMessage.channel.send("Ok try again later :P");
            } else if (message.content.toLowerCase() === "search") {
              await this.receivedMessage.channel.send(
                `\`\`\`Ok, displaying games that I have found you can type 'yes'/'no' still\`\`\``
              );

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
              await this.receivedMessage.channel.send(
                `\`\`\`please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.\`\`\`\`\`\`type \`end\` if you want to finish\`\`\``
              );
            }
            if (message.content.toLowerCase() === "no") {
              this.stop();
              await this.receivedMessage.channel.send(
                "``` Ok, will not do anything with it ```"
              );
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

  end(fn) {
    this.collectorInstance.on("end", async collected => {
      try {
        switch (this.type) {
          case "upload":
            await this.receivedMessage.channel.send("upload session ended");
            break;
          case "edit":
            {
              let collectedArguments = [];
              collected.forEach(item => {
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
                fn(diffArguments);
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
