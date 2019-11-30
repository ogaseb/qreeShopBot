const {
  createArrayOfEmbeddedMessages,
  createPaginationFromEmbed
} = require("./embedded");

const dataMock = {
  id: 1,
  name: "test",
  platform: "test",
  region: "test",
  size: "test",
  uploaderName: "test",
  qrImageUrl: "test",
  thumbnail: "test"
};

describe("Embedded", () => {
  test("it should return an array of embeds", async () => {
    const embeddedMessages = await createArrayOfEmbeddedMessages(dataMock);
    expect(Array.isArray(embeddedMessages)).toBe(true);
  });

  test("it should return an object that is pagination to be rendered in search command", async () => {
    const embeddedMessages = await createArrayOfEmbeddedMessages(dataMock);
    const paginationEmbedded = await createPaginationFromEmbed(
      embeddedMessages,
      [""],
      true,
      "",
      "title",
      "footer",
      true,
      1000
    );
    expect(typeof paginationEmbedded).toBe("object");
  });

  test("it should return an object that is pagination to be rendered in qr channel", async () => {
    const embeddedMessages = await createArrayOfEmbeddedMessages(dataMock);
    const paginationEmbedded = await createPaginationFromEmbed(
      embeddedMessages,
      [""],
      false,
      "",
      "title",
      "footer",
      false,
      0
    );
    expect(typeof paginationEmbedded).toBe("object");
  });
});
