import { createDataURLQrCode } from "../../helpers/helpers";
import { getWholeDB, updateQrImageUrl } from "../../db/db_qree";
import { MessageCollector } from "discord.js";
import imageDataURI from "image-data-uri";
import fs from "fs";

export async function makeQrImagesfromDB(
  messageArguments,
  receivedMessage,
  client
) {
  try {
    const rows = await getWholeDB();
    for (const {
      id,
      qr_image_url,
      qr_data,
      qr_link,
      name,
      platform,
      region,
      size,
      uploader_discord_id
    } of rows) {
      const obj = {
        name: name,
        qr_link: qr_link,
        qr_data: qr_data,
        qr_image: await createDataURLQrCode(qr_link),
        platform: platform,
        region: region,
        size: size,
        uploader_discord_id,
        id
      };

      console.log(qr_image_url);

      if (qr_image_url === "null") {
        let string = obj.name + obj.platform + obj.region + uploader_discord_id;
        string = string.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "");
        // console.log(string);
        await imageDataURI.outputFile(obj.qr_image, "./img/" + string + ".png");

        fs.access("./img/" + string + ".png", fs.F_OK, async err => {
          if (err) {
            console.error(err);
            return;
          }
          const msg = await receivedMessage.channel.send("", {
            files: ["./img/" + string + ".png"]
          });
          //file exists
          console.log(msg.attachments.values().next().value.proxyURL);
          obj.qr_image = msg.attachments.values().next().value.proxyURL;
          await updateQrImageUrl(obj.id, obj.qr_image);
        });
      }
    }
  } catch (e) {
    console.log(e);
  }

  // let data = []

  // const obj = {
  //   name: messageArguments[titleIndex].replace(/^"(.*)"$/, "$1"),
  //   qr_link: messageArguments[urlIndex],
  //   qr_data: await createASCIIQrCode(messageArguments[urlIndex]),
  //   qr_image_url: await createDataURLQrCode(messageArguments[urlIndex]),
  //   platform: messageArguments[platformIndex],
  //   region: messageArguments[regionIndex],
  //   size: messageArguments[sizeIndex],
  //   uploader_discord_id: receivedMessage.author.id,
  //   uploader_name: receivedMessage.author.username
  // };

  // imageDataURI.decode(obj.qr_data);

  // const { rows } = await findGame(obj.name.replace(/'/g, "''"));
  // const text =
  //   rows.length === 0
  //     ? "```diff\n" +
  //       "+ This is how it will look, save in database? Type 'yes'/'no'" +
  //       "\n```"
  //     : "```diff\n" +
  //       "- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' GAMES BY TYPING 'search'" +
  //       "\n```" +
  //       "```diff\n" +
  //       "+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)" +
  //       "\n```";
  // await receivedMessage.channel
  //   .send(
  //     "```" +
  //       "\nLink: " +
  //       obj.qr_link +
  //       "\n\nName: " +
  //       obj.name +
  //       "\nPlatform: " +
  //       obj.platform +
  //       "\nRegion: " +
  //       obj.region +
  //       "\nSize: " +
  //       obj.size +
  //       "\nUploader: " +
  //       obj.uploader_name +
  //       "```" +
  //       text,
  //     {
  //       files: [
  //         "./img/" +
  //           obj.name.replace(/ /g, "") +
  //           obj.platform +
  //           obj.region +
  //           obj.size +
  //           random +
  //           ".png"
  //       ]
  //     }
  //   )
  //   .then(msg => {
  //     obj.qr_image_url = msg.attachments.values().next().value.proxyURL;
  //   });
  //
  // // fs.unlink(
  // //   "./img/" +
  // //     obj.name.replace(/ /g, "") +
  // //     obj.platform +
  // //     obj.region +
  // //     obj.size +
  // //     random +
  // //     ".png",
  // //   err => {
  // //     if (err) {
  // //       console.error(err);
  // //     }
  // //   }
  // // );
  //
  // const collector = new MessageCollector(
  //   receivedMessage.channel,
  //   m => m.author.id === receivedMessage.author.id,
  //   { time: 60000 }
  // );
  // collector.on("collect", async message => {
  //   if (message.content.toLowerCase() === "yes") {
  //     collector.stop();
  //     try {
  //       await receivedMessage.channel.send("Saving in database!");
  //       await createQree(
  //         obj.qr_data,
  //         obj.qr_image_url,
  //         obj.qr_link,
  //         obj.name,
  //         obj.platform,
  //         obj.region,
  //         obj.size,
  //         obj.uploader_discord_id,
  //         obj.uploader_name
  //       );
  //
  //       // const QrCodesSubscription = sendToQrGames(obj, receivedMessage, client);
  //       // await QrCodesSubscription.build();
  //     } catch (e) {
  //       console.log(e);
  //       await receivedMessage.channel.send(
  //         "something went wrong, send it to developer: \n" +
  //           "```diff\n- " +
  //           e +
  //           "```"
  //       );
  //     }
  //   } else if (message.content.toLowerCase() === "no") {
  //     collector.stop();
  //
  //     try {
  //       await receivedMessage.channel.send("Ok try again later :P");
  //     } catch (e) {
  //       console.log(e);
  //       await receivedMessage.channel.send(
  //         "something went wrong, send it to developer: \n" +
  //           "```diff\n- " +
  //           e +
  //           "```"
  //       );
  //     }
  //   } else if (message.content.toLowerCase() === "search") {
  //     try {
  //       await receivedMessage.channel.send(
  //         "```Ok, displaying games that I have found you can type 'yes'/'no' still```"
  //       );
  //
  //       const QrCodesSearchResults = await createEmbeddedAnswer(
  //         rows,
  //         receivedMessage
  //       );
  //       await QrCodesSearchResults.build();
  //     } catch (e) {
  //       console.log(e);
  //       await receivedMessage.channel.send(
  //         "something went wrong, send it to developer: \n" +
  //           "```diff\n- " +
  //           e +
  //           "```"
  //       );
  //     }
  //   }
  // });
  //
  // collector.on("end", async () => {
  //   await receivedMessage.channel.send("upload session ended");
  // });
}
