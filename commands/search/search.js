import { findGame } from "../../db/db_qree";
import { checkIfDM, createEmbeddedAnswer } from "../../helpers/helpers";
import pgEscape from "pg-escape";
import { insertOnSearchCommand } from "../../db/db_search_stats";

export async function searchGame(messageArguments, receivedMessage) {
  try {
    //remove "search" from first element of array
    let args = messageArguments.split(" ");
    args.splice(0, 1);
    let finalArgs = args.join(" ");

    const nameEscaped = pgEscape
      .string(finalArgs.replace(/^"(.*)"$|^'(.*)'$|^“(.*)“$/, "$1"))
      .replace(/'/g, "''");
    const { rows } = await findGame(nameEscaped);
    if (rows.length === 0) {
      if (checkIfDM(receivedMessage)) {
        await insertOnSearchCommand(
          receivedMessage.author.id,
          nameEscaped,
          "dm",
          false
        );
        return await receivedMessage.channel.send(
          `I didn't find anything called \`${finalArgs}\` in my database. If you want to request games join https://discord.gg/uJnP5q`
        );
      } else {
        await insertOnSearchCommand(
          receivedMessage.author.id,
          nameEscaped,
          "server",
          false
        );
        return await receivedMessage.channel.send(
          `I didn't find anything called \`${finalArgs}\` in my database. You can request game on <#582262747937505290> channel`
        );
      }
    } else {
      if (checkIfDM(receivedMessage)) {
        await insertOnSearchCommand(
          receivedMessage.author.id,
          nameEscaped,
          "dm",
          true
        );
      } else {
        await insertOnSearchCommand(
          receivedMessage.author.id,
          nameEscaped,
          "server",
          true
        );
      }

      const QrCodesSearchResults = await createEmbeddedAnswer(
        rows,
        receivedMessage
      );
      await QrCodesSearchResults.build();
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
}
