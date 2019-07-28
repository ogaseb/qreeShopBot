import { findGame } from "../db/db_qree";
import { createEmbeddedAnswer } from "../helpers/helpers";
import pgEscape from "pg-escape";

export async function searchGame(messageArguments, receivedMessage) {
  try {
    // const games = await findGame(messageArguments[1])
    if (messageArguments.length !== 2) {
      return await receivedMessage.channel.send(
        `invalid arguments for search command`
      );
    }

    const name = pgEscape
      .string(messageArguments[1].replace(/^"(.*)"$/, "$1"))
      .replace(/'/g, "''");
    const { rows } = await findGame(name);
    if (rows.length === 0) {
      return await receivedMessage.channel.send(
        `I didn't find anything called \`${messageArguments[1].replace(
          /^"(.*)"$/,
          "$1"
        )}\``
      );
    } else {
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
