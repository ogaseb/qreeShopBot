const {
  embedded: { sendToQrGames, createEmbeddedAnswer },
  other: { regexes }
} = require("../../helpers");
const { createQree } = require("../../controllers/qre_items");
const { MessageCollector } = require("discord.js");

const QrCollector = class QrCollector {
  constructor(
    receivedMessage,
    type,
    { time = 120000, client, qrGameObject, searchResult } = {}
  ) {
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
        if (this.type === "upload") {
          if (message.content.toLowerCase() === "yes") {
            this.stop();
            this.qrGameObject.id = await createQree(
              this.qrGameObject,
              this.receivedMessage
            );
            await this.receivedMessage.channel.send("Saving in database!");

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
        } else if (this.type === "edit") {
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
        if (this.type === "upload") {
          await this.receivedMessage.channel.send("upload session ended");
        } else if (this.type === "edit") {
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

          if (diffArguments && collectedArguments[0].toLowerCase() === "yes") {
            fn(diffArguments);
          }
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
