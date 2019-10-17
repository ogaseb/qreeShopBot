!(function(e) {
  var n = {};
  function t(a) {
    if (n[a]) return n[a].exports;
    var o = (n[a] = { i: a, l: !1, exports: {} });
    return e[a].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  (t.m = e),
    (t.c = n),
    (t.d = function(e, n, a) {
      t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: a });
    }),
    (t.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (t.t = function(e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e;
      if (4 & n && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (t.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & n && "string" != typeof e)
      )
        for (var o in e)
          t.d(
            a,
            o,
            function(n) {
              return e[n];
            }.bind(null, o)
          );
      return a;
    }),
    (t.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(n, "a", n), n;
    }),
    (t.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.p = ""),
    t((t.s = 12));
})([
  function(e, n) {
    e.exports = require("discord.js");
  },
  function(e, n) {
    e.exports = require("sequelize");
  },
  function(e, n) {
    e.exports = require("axios");
  },
  function(e, n) {
    e.exports = require("image-data-uri");
  },
  function(e, n) {
    e.exports = require("discord-paginationembed");
  },
  function(e, n) {
    e.exports = require("prettysize");
  },
  function(e, n) {
    e.exports = require("dotenv");
  },
  function(e, n) {
    e.exports = require("qrcode-generator");
  },
  function(e, n) {
    e.exports = require("fs");
  },
  function(e, n) {
    e.exports = require("node-fetch");
  },
  function(e, n) {
    e.exports = require("jimp");
  },
  function(e, n) {
    e.exports = require("qrcode-reader");
  },
  function(e, n, t) {
    "use strict";
    t.r(n);
    var a = t(0),
      o = t(7),
      i = t.n(o),
      s = t(4),
      l = t(2),
      r = t.n(l),
      d = t(5),
      c = t.n(d);
    function u(e) {
      return e && e.match(E.GDRIVE)
        ? (function(e) {
            return e.replace(
              /\/file\/d\/(.+)\/(.+)/,
              "/uc?export=download&id=$1"
            );
          })(e)
        : e && e.match(E.DROPBOX)
        ? "0" === e.slice(-1) || "1" === e.slice(-1)
          ? (e = (e = (function(e) {
              let n = e;
              return "sh" === (n = n.split("/"))[3]
                ? n.join("/")
                : ((n[5] = "?dl=1"), n.join("/"));
            })(e)).match(/^(.*?)\.?dl=1/gi))[0]
          : void 0
        : e;
    }
    function m(e) {
      let n = i()(0, "L");
      return n.addData(`${e}`), n.make(), n.createASCII(2, 1);
    }
    function g(e) {
      let n = i()(0, "M");
      return n.addData(`${e}`), n.make(), n.createDataURL(5, 5);
    }
    async function h(e, n, t) {
      const o = [];
      return (
        e.map(
          async ({
            id: e,
            qr_link: n,
            name: t,
            platform: i,
            region: s,
            size: l,
            uploader_name: r,
            qr_image_url: d
          }) => {
            console.log(d),
              o.push(
                new a.RichEmbed()
                  .setImage(d)
                  .addField("Name: ", t, !0)
                  .addField("QR link: ", n)
                  .addField("DB ID: ", e, !0)
                  .addField("Platform: ", i, !0)
                  .addField("Region: ", s, !0)
                  .addField("Size: ", l)
                  .addField("QR:", "===================", !0)
                  .addField("Author: ", r, !0)
              );
          }
        ),
        new s.Embeds()
          .setArray(o)
          .setAuthorizedUsers([n.author.id])
          .setChannel("pm" === t ? n.author : n.channel)
          .setPageIndicator(!0)
          .setPage(1)
          .setTitle("Qr Code 3DS games search collection")
          .setDescription(
            "=========================================================="
          )
          .setFooter("Bot created by: ProPanek#0188")
          .setColor(0)
          .setNavigationEmojis({
            back: "◀",
            jump: "↗",
            forward: "▶",
            delete: "🗑"
          })
          .setTimeout(6e5)
      );
    }
    function p(e) {
      return "dm" === e.channel.type;
    }
    function f(e) {
      return Object.keys(E)
        .filter(n => e.includes(n))
        .reduce((e, n) => ((e[n] = E[n]), e), {});
    }
    async function w(e) {
      const n = await r.a.head(e, { timeout: 15e3 });
      if (n && 404 !== n.status && n.headers["content-length"])
        return c()(n.headers["content-length"], !0);
    }
    async function y(e) {
      let n = encodeURI(
        `${"https://api.tenor.com/v1/random"}?key=${"T64EWZS77O3H"}&q=${e}&contentfilter=${"medium"}&media_filter=minimal&limit=1`
      );
      return (await r.a.get(n)).data.results[0].media[0].gif.url;
    }
    const E = {
      DROPBOX: /\b(\w*dropbox\w*)\b/g,
      CIA: /\b(\w*cia\w*)\b/g,
      GDRIVE: /\b(\w*drive.google.com\w*)\b/g,
      URL: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?/g,
      ARGUMENTS: /\b(\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\w*)\b|(\d+\.?\d+)\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)|(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\“(?:\\“|[^“])+/gi,
      TITLE: /"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\“(?:\\“|[^“])+“/g,
      REGIONS: /\b\w*USA|JPN|EUR|GLOBAL|HACK\w*\b/gi,
      PLATFORMS: /\b\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\w*\b/g,
      SIZE: /(\d*\.?\d+)\s*(KB|MB|GB|Bytes|Kilobytes|Megabytes)/gi,
      SCRAPER: /\b([^\(]+)|\((.*?)\)|(\w*GBA|GBC|GAMEBOY|NES|SNES|MEGA DRIVE|PCE|3DS|NEW3DS|DSI|ESHOP|NEW 3DS|NEO GEO|SEGA GENESIS|VIRTUAL CONSOLE|MAME|TURBOGRAFX\w*)\b|(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?|\w+|"(?:\\"|[^"])+"|\'(?:\\'|[^'])+'|\S+/gi
    };
    var S = t(9),
      _ = t.n(S),
      R = t(10),
      b = t.n(R),
      I = t(11),
      A = t.n(I),
      v = t(6),
      N = t.n(v),
      q = t(1);
    N.a.config();
    const O = q.Sequelize.Op,
      T = new q.Sequelize(process.env.DATABASE_URL, {
        define: { timestamps: !1 }
      });
    T.authenticate()
      .then(() => {
        console.log(
          "sequelize -> Connection has been established successfully."
        );
      })
      .catch(e => {
        console.error("sequelize -> Unable to connect to the database:", e);
      });
    class D extends q.Sequelize.Model {}
    async function G(
      {
        qr_data: e,
        qr_image_url: n,
        qr_link: t,
        name: a,
        platform: o,
        region: i,
        size: s,
        uploader_discord_id: l,
        uploader_name: r
      },
      d
    ) {
      try {
        const c = await D.create({
          qr_data: e,
          qr_image_url: n,
          qr_link: t,
          name: a,
          platform: o,
          region: i,
          size: s,
          uploader_discord_id: l,
          uploader_name: r
        });
        return (
          await d.channel.send("Saving in database!"),
          console.log("DB -> save qr in DB"),
          c.id
        );
      } catch (e) {
        await d.channel.send(
          "something went wrong, send it to developer: \n```diff\n- " +
            e +
            "```"
        ),
          console.log(e);
      }
    }
    async function L(e) {
      let n = [];
      e.split(" ").forEach(e => {
        n.push({ name: { [O.iLike]: `%${e}%` } });
      });
      try {
        return await D.findAll({ where: { [O.and]: n } });
      } catch (e) {
        console.log(e);
      }
    }
    async function M() {
      try {
        return await D.findAll();
      } catch (e) {
        console.log(e);
      }
    }
    async function C(e, n) {
      try {
        await D.update({ qr_image_url: n }, { where: { id: e } }),
          console.log("DB -> updating qr url image");
      } catch (e) {
        console.log(e);
      }
    }
    async function F(e, n) {
      try {
        const t = await D.update({ size: n }, { where: { id: e } });
        return console.log("DB -> updating size for id: " + e), t;
      } catch (e) {
        console.log(e);
      }
    }
    async function B(e, n) {
      try {
        const t = await D.update({ region: n }, { where: { id: e } });
        return console.log("DB -> updating region for id: " + e), t;
      } catch (e) {
        console.log(e);
      }
    }
    D.init(
      {
        id: {
          type: q.Sequelize.INTEGER,
          autoIncrement: !0,
          allowNull: !1,
          primaryKey: !0
        },
        qr_data: { type: q.Sequelize.TEXT, allowNull: !1 },
        qr_image_url: { type: q.Sequelize.TEXT, allowNull: !1 },
        qr_link: { type: q.Sequelize.STRING, allowNull: !1 },
        name: { type: q.Sequelize.STRING, allowNull: !1 },
        platform: { type: q.Sequelize.STRING, allowNull: !1 },
        region: { type: q.Sequelize.STRING, allowNull: !1 },
        size: { type: q.Sequelize.STRING, allowNull: !1 },
        uploader_discord_id: { type: q.Sequelize.STRING, allowNull: !1 },
        uploader_name: { type: q.Sequelize.STRING, allowNull: !1 }
      },
      { sequelize: T, modelName: "qre_items" }
    ),
      T.sync();
    var k = t(3),
      $ = t.n(k);
    async function U(e, n, t) {
      try {
        if (5 !== e.length)
          return n.channel.send("invalid arguments count for upload command");
        const o = await y("head-pat-anime"),
          i = (await n.channel.send("wait a moment...", { files: [o] })).id,
          l = f(["URL", "TITLE", "REGIONS", "PLATFORMS"]);
        let r = {};
        for (const t in l) {
          const a = await e.findIndex(e => l[t].test(e));
          if (-1 === a)
            return await n.channel.send(
              `invalid arguments \`${t}\` for upload command`
            );
          (r[t] = e[a]), e.splice(a, 1);
        }
        const d = {
          name: r.TITLE.replace(/['"]+/g, ""),
          qr_link: u(r.URL),
          qr_data: m(u(r.URL)),
          qr_image_url: g(u(r.URL)),
          platform: r.PLATFORMS,
          region: r.REGIONS,
          size: await w(u(r.URL)),
          uploader_discord_id: n.author.id,
          uploader_name: n.author.username
        };
        let c = d.name + d.platform + d.region + d.uploader_discord_id;
        (c = c.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "")),
          await $.a.outputFile(d.qr_image_url, "./img/" + c + ".jpg");
        const p = await L(d.name),
          E =
            0 === p.length
              ? "```diff\n This is how it will look, save in database? Type 'yes'/'no'\n```"
              : "```diff\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' BY TYPING 'search'\"\n``````diff\n+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)\"\n```";
        setTimeout(async () => {
          n.channel.messages.get(i).delete(),
            await n.channel
              .send("", { files: ["./img/" + c + ".jpg"] })
              .then(e => {
                d.qr_image_url = e.attachments.values().next().value.proxyURL;
              }),
            await n.channel.send(
              `\`\`\`\nLink: ${d.qr_link}\n\nName: ${d.name}\nPlatform: ${d.platform}\nRegion: ${d.region}\nSize: ${d.size}\nUploader: ${d.uploader_name}\`\`\`${E}`
            );
        }, 3e3);
        const S = new a.MessageCollector(
          n.channel,
          e => e.author.id === n.author.id,
          { time: 6e4 }
        );
        S.on("collect", async e => {
          if ("yes" === e.content.toLowerCase()) {
            S.stop();
            try {
              d.id = await G(d, n);
              const e = (function(e, n, t) {
                const o = [];
                return (
                  console.log(e),
                  o.push(
                    new a.RichEmbed()
                      .setImage(e.qr_image_url)
                      .addField("Name: ", e.name, !0)
                      .addField("QR link: ", e.qr_link)
                      .addField("DB ID: ", e.id, !0)
                      .addField("Platform: ", e.platform, !0)
                      .addField("Region: ", e.region, !0)
                      .addField("Size: ", e.size)
                      .addField("QR: ", "===================", !0)
                      .addField("Author: ", e.uploader_name, !0)
                  ),
                  new s.Embeds()
                    .setArray(o)
                    .setPageIndicator(!1)
                    .setAuthorizedUsers([])
                    .setChannel(
                      t.channels.get(process.env.BOT_SUBSCRIPTION_CHANNEL)
                    )
                    .setPage(1)
                    .setTitle("QR Code 3DS games subscription module")
                    .setDescription(
                      "=========================================================="
                    )
                    .setFooter("Bot created by: ProPanek#0188")
                    .setColor(0)
                    .setDisabledNavigationEmojis(["ALL"])
                    .setTimeout(6e5)
                );
              })(d, 0, t);
              await e.build();
            } catch (e) {
              console.log(e),
                await n.channel.send(
                  `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
                );
            }
          } else if ("no" === e.content.toLowerCase()) {
            S.stop();
            try {
              await n.channel.send("Ok try again later :P");
            } catch (e) {
              console.log(e),
                await n.channel.send(
                  `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
                );
            }
          } else if ("search" === e.content.toLowerCase())
            try {
              await n.channel.send(
                "```Ok, displaying games that I have found you can type 'yes'/'no' still````"
              );
              const e = await h(p, n);
              await e.build();
            } catch (e) {
              console.log(e),
                await n.channel.send(
                  `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
                );
            }
        }),
          S.on("end", async () => {
            await n.channel.send("upload session ended");
          });
      } catch (e) {
        console.log(e),
          await n.channel.send(
            `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
          );
      }
    }
    async function P(e, n) {
      try {
        const t = parseInt(e[1]),
          o = await (async function(e) {
            try {
              return await D.findAll({ where: { id: e }, limit: 1 });
            } catch (e) {
              console.log(e);
            }
          })(t),
          {
            qr_data: i,
            qr_image_url: s,
            qr_link: l,
            name: r,
            platform: d,
            region: c,
            size: u,
            uploader_discord_id: h,
            uploader_name: p
          } = o[0];
        if (o.length) {
          await n.channel.send(
            `\`\`\`\nLink: ${l}\n\nName: ${r}\nPlatform: ${d}\nRegion: ${c}\nSize: ${u}\nUploader: ${p}\`\`\` \n        \`\`\`Is this the game you wish to edit? type 'yes'/'no'\`\`\``,
            { files: [s] }
          );
          const e = new a.MessageCollector(
            n.channel,
            e => e.author.id === n.author.id,
            { time: 12e4 }
          );
          e.on("collect", async t => {
            "yes" === t.content.toLowerCase() &&
              (await n.channel.send(
                "```please type all the information you want to edit, remember that title NEEDS to be in quotation marks. You can type all info you want to edit in one or more messages.```\n            ```type `end` if you want to finish```"
              )),
              "no" === t.content.toLowerCase() &&
                (e.stop(),
                await n.channel.send(
                  "``` Ok, will not do anything with it ```"
                )),
              "end" === t.content.toLowerCase() && e.stop();
          }),
            e.on("end", async e => {
              let a = [];
              for (const n of e) a.push(n[1].content);
              const o = a
                  .filter(
                    function(e) {
                      return this.indexOf(e.toLowerCase()) < 0;
                    },
                    ["end", "yes", "no"]
                  )
                  .join(" ")
                  .match(E.ARGUMENTS),
                y = f(["URL", "TITLE", "REGIONS", "PLATFORMS", "SIZE"]);
              let S = {};
              for (const e in y) {
                console.log(y[e]);
                const t = o.findIndex(n => y[e].test(n));
                -1 === t
                  ? await n.channel.send(
                      `argument \`${e}\` is missing continue...`
                    )
                  : ((S[e] = o[t]),
                    o.splice(t, 1),
                    await n.channel.send(
                      `argument \`${e}\` is present! : \`${S[e]}\``
                    ));
              }
              console.log(S);
              const _ = {
                name: S.TITLE ? S.TITLE : r,
                qr_link: S.URL ? S.URL : l,
                qr_data: S.URL ? m(S.URL) : i,
                qr_image_url: S.URL ? g(S.URL) : s,
                platform: S.PLATFORMS ? S.PLATFORMS : d,
                region: S.REGIONS ? S.REGIONS : c,
                size: S.SIZE ? S.SIZE : u,
                uploader_discord_id: h,
                uploader_name: p
              };
              let R = "";
              if (S.URL) {
                let e = _.name + _.platform + _.region + _.uploader_discord_id;
                (e = e.replace(/[^a-z0-9]/gim, "")),
                  await $.a.outputFile(_.qr_image_url, "./img/" + e + ".jpg"),
                  await n.channel
                    .send("", { files: ["./img/" + e + ".jpg"] })
                    .then(e => {
                      _.qr_image_url = e.attachments
                        .values()
                        .next().value.proxyURL;
                    }),
                  (R = await w(S.URL));
              }
              await (async function(
                e,
                {
                  qr_data: n,
                  qr_image_url: t,
                  qr_link: a,
                  name: o,
                  platform: i,
                  region: s,
                  uploader_discord_id: l,
                  uploader_name: r
                },
                d,
                c
              ) {
                try {
                  await D.update(
                    {
                      qr_data: n,
                      qr_image_url: t,
                      qr_link: a,
                      name: o,
                      platform: i,
                      region: s,
                      newSize: d,
                      uploader_discord_id: l,
                      uploader_name: r
                    },
                    { where: { id: e } }
                  ),
                    await c.channel.send("Edited!"),
                    console.log("DB -> save qr in DB");
                } catch (e) {
                  await c.channel.send(
                    "something went wrong, send it to developer: \n```diff\n- " +
                      e +
                      "```"
                  ),
                    console.log(e);
                }
              })(t, _, R || _.size, n);
            });
        } else await n.channel.send("cant find it in database");
      } catch (e) {
        console.log(e),
          await n.channel.send(
            "something went wrong, send it to developer: \n```diff\n- " +
              e +
              "```"
          );
      }
    }
    var z = t(8),
      x = t.n(z);
    async function j(e) {
      await e.channels
        .get("604692367018033152")
        .send("Checking urls started... I will do it every 24 hours");
      const n = await M();
      for (const { id: t, qr_link: a, name: o, uploader_discord_id: i } of n)
        try {
          console.time(`scanningTime - ${o}`),
            await r.a.head(a, { timeout: 3e4 }),
            console.timeEnd(`scanningTime - ${o}`);
        } catch (n) {
          n.response
            ? 404 === n.response.status &&
              (await e.channels
                .get("604692367018033152")
                .send(
                  `${a} sends ${n.response.status} respond code (not found or other error) for game: ${o}. DB ID for updating: ${t} . <@${i}>`
                ))
            : await e.channels
                .get("604692367018033152")
                .send(
                  `${a} sends error, but link probably works, check by clicking on it: ${o}. DB ID for updating: ${t} . <@${i}>`
                );
        }
      await e.channels
        .get("604692367018033152")
        .send("All games have been scanned!");
    }
    t(6).config(),
      process.on("unhandledRejection", (e, n) => {
        console.log("An unhandledRejection occurred"),
          console.log(`Rejected Promise: ${n}`),
          console.log(`Rejection: ${e}`);
      }),
      (async function() {
        try {
          await V.login(process.env.BOT_TOKEN);
        } catch (e) {
          console.log(e);
        }
      })();
    const V = new a.Client();
    let Y = process.env.BOT_DEFAULT_INVOKE,
      H = new Map();
    function K(e) {
      let n, t;
      const o = (n = p(e)
        ? e.content.substr(Y.length + 1)
        : e.content.substr(H.get(e.guild.id).length + 1)).match(E.ARGUMENTS);
      if ((null !== o && o.length && (t = o[0]), "" !== t && null != t))
        return "help" === t
          ? (function(e, n, t) {
              const o = [];
              return (
                p(n)
                  ? o.push(
                      new a.RichEmbed()
                        .addField("**COMMAND**: ", "```search```")
                        .addField(
                          "Description",
                          "```search -  It's available on channels and DM's, it will search for all games containing typed phrase. (emoji navigation in dm's is a little buggy but it works)```"
                        )
                        .addField("Command: ", '```!qre search "<name>" ```')
                        .addField(
                          "Example: ",
                          '```!qre search "Super Castlevania IV"```'
                        )
                    )
                  : (o.push(
                      new a.RichEmbed()
                        .addField("**COMMAND**: ", "```upload```")
                        .addField(
                          "Description",
                          "```upload - upload is available only in certain servers on Discord and only available to users containing special role(s). Remember about quotation marks in title of the game!```"
                        )
                        .addField(
                          "Arguments: ",
                          "```<platform> -  GBA, GBC, GAMEBOY, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO, VIRTUAL CONSOLE, MEGA DRIVE, SEGA GENESIS, MAME, TURBOGRAFX \n\n<regions> - USA, JPN, EUR, GLOBAL, HACK \n\n```"
                        )
                        .addField(
                          "Command: ",
                          "```" +
                            e.get(n.guild.id) +
                            ' upload <url> "<name>" <platform> <region>```'
                        )
                        .addField(
                          "Example: ",
                          "```" +
                            e.get(n.guild.id) +
                            ' upload https://files.catbox.moe/au9pkx.cia "Super Castlevania IV" GBA USA```'
                        )
                    ),
                    o.push(
                      new a.RichEmbed()
                        .addField("**COMMAND**: ", "```edit```")
                        .addField(
                          "Description",
                          "```edit - edit same as upload is available only in certain servers on Discord and only available to users containing special role(s). First you need to find the game you want to edit, just search it with search command and copy `DB ID` numberthen you proceed by typing edit command with this id ad you copied. After the game is found follow the instructions```"
                        )
                        .addField(
                          "Arguments: ",
                          "```<platform> - GBA, GBC, GAMEBOY, NES, SNES, 3DS, DSI, ESHOP, NEW 3DS, NEO GEO, VIRTUAL CONSOLE, MEGA DRIVE, SEGA GENESIS, MAME, TURBOGRAFX \n\n<regions> - USA, JPN, EUR, GLOBAL, HACK \n\n<size> - *KB, *MB, *GB \n```"
                        )
                        .addField(
                          "Command: ",
                          "```" + e.get(n.guild.id) + " edit <id> ```"
                        )
                        .addField(
                          "Example: ",
                          "```" + e.get(n.guild.id) + " edit 10 ```"
                        )
                    ),
                    o.push(
                      new a.RichEmbed()
                        .addField("**COMMAND**: ", "```search```")
                        .addField(
                          "Description",
                          "```search -  It's available on channels and DM's, it will search for all games containing typed phrase. (emoji navigation in dm's is a little buggy but it works)```"
                        )
                        .addField(
                          "Command: ",
                          "```" + e.get(n.guild.id) + ' search "<name>" ```'
                        )
                        .addField(
                          "Example: ",
                          "```" +
                            e.get(n.guild.id) +
                            ' search "Super Castlevania IV"```'
                        )
                    ),
                    o.push(
                      new a.RichEmbed()
                        .addField("**COMMAND**: ", "```invoke```")
                        .addField(
                          "Description",
                          "```invoke - server only command which lets you change the command for invoking bot the default is always !qre```"
                        )
                        .addField(
                          "Command: ",
                          "```" +
                            e.get(n.guild.id) +
                            " invoke <new_command> ```"
                        )
                        .addField(
                          "Example: ",
                          "```" + e.get(n.guild.id) + "invoke %qre```"
                        )
                    )),
                new s.Embeds()
                  .setArray(o)
                  .setAuthorizedUsers([n.author.id])
                  .setChannel("pm" === t ? n.author : n.channel)
                  .setPageIndicator(!0)
                  .setPage(1)
                  .setTitle("Qr Code 3DS help")
                  .setDescription(
                    "=========================================================="
                  )
                  .addField(
                    "NOTE:",
                    "```links - you can provide direct link or normal sharing links from google and dropbox it will be automatically converted into direct ones```"
                  )
                  .setFooter("")
                  .setColor(16777215)
                  .setNavigationEmojis({
                    back: "◀",
                    jump: "↗",
                    forward: "▶",
                    delete: "🗑"
                  })
                  .setTimeout(6e5)
              );
            })(H, e).build()
          : "headpat" === t
          ? (async function(e, n) {
              if (2 !== e.length)
                return n.channel.send("hey, specify who you want to headpat!");
              n.channel.messages.get(n.id).delete();
              const t = await y("head-pat-anime"),
                o = new a.RichEmbed()
                  .setColor(
                    `${"#" + Math.floor(16777215 * Math.random()).toString(16)}`
                  )
                  .setDescription(`uwu *<@${n.author.id}> headpats <@${e[1]}>*`)
                  .setImage(t);
              n.channel.send(o);
            })(o, e)
          : "search" === t
          ? (async function(e, n) {
              try {
                let t = e.split(" ");
                t.splice(0, 1);
                let a = t.join(" ");
                const o = await L(a);
                if (0 === o.length)
                  return p(n)
                    ? await n.channel.send(
                        `I didn't find anything called \`${a}\` in my database. If you want to request games join https://discord.gg/uJnP5q`
                      )
                    : await n.channel.send(
                        `I didn't find anything called \`${a}\` in my database. You can request game on <#582262747937505290> channel`
                      );
                {
                  const e = await h(o, n);
                  await e.build();
                }
              } catch (e) {
                console.log(e),
                  await n.channel.send(
                    `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
                  );
              }
            })(n, e)
          : p(e)
          ? e.channel.send("this command is available only on qreeShop server")
          : process.env.BOT_PERMISSIONS_GUILD.includes(e.guild.id) &&
            e.member.roles.some(e =>
              process.env.BOT_PERMISSIONS_ROLES.includes(e.name)
            )
          ? "upload" === t
            ? U(o, e, V)
            : e.member.roles.some(e =>
                process.env.BOT_PERMISSIONS_INVOKE.includes(e.name)
              )
            ? "invoke" === t
              ? (function(e, n, t) {
                  return "dm" === n.channel.type
                    ? n.channel.send(
                        "This command is available only in servers"
                      )
                    : e.length > 3
                    ? n.channel.send("Too much arguments for invoke command")
                    : e[1]
                    ? (t.set(n.guild.id, e[1]),
                      n.channel.send(
                        "Successfully changed your invoke command"
                      ))
                    : void 0;
                })(o, e, H)
              : "scrap" === t
              ? (async function(e, n) {
                  if ("dm" === n.channel.type)
                    return n.channel.send(
                      "This command is available only in servers"
                    );
                  try {
                    await n.author.send("Starting scrapping"),
                      (async function(e, n = 9e3) {
                        const t = [];
                        let a;
                        for (;;) {
                          const o = { limit: 100 };
                          a && (o.before = a);
                          const i = await e.messages.fetch(o);
                          if (
                            (t.push(...i.array()),
                            (a = i.last().id),
                            100 !== i.size || t >= n)
                          )
                            break;
                        }
                        return t;
                      })(n.channel).then(async e => {
                        for (const t of e)
                          if (t.attachments.size) {
                            let e = t.content.match(E.SCRAPER);
                            if (!e) continue;
                            let a = (e = e
                              .map(
                                Function.prototype.call,
                                String.prototype.trim
                              )
                              .filter(function(e) {
                                if (null !== e && " " !== e) return e;
                              }))[0];
                            a &&
                              (a = a
                                .replace(/^"(.*)"$/, "$1")
                                .replace(/'/g, "''")),
                              e.shift();
                            const { rows: o } = await L(a);
                            if (o.length) {
                              console.log(
                                "Game is already in DB " + a + " Skipping..."
                              );
                              continue;
                            }
                            const i = e.findIndex(e => E.REGIONS.test(e)),
                              s = e.findIndex(e => E.PLATFORMS.test(e)),
                              l = e.findIndex(e => E.SIZE.test(e)),
                              r = await _()(
                                `${
                                  t.attachments.values().next().value.proxyURL
                                }`
                              ),
                              d = await r.buffer(),
                              c = await b.a.read(d).catch(e => {
                                console.log(e);
                              });
                            if (!c) continue;
                            const u = await new A.a(),
                              g = await new Promise((e, n) => {
                                (u.callback = (t, a) => {
                                  null != t ? n(t) : e(a);
                                }),
                                  u.decode(c.bitmap);
                              }).catch(e => {
                                console.log(e);
                              }),
                              h = {
                                name: a,
                                qr_link: g.result,
                                qr_data: await m(g.result),
                                qr_image_url: null,
                                platform: e[s] || "3DS",
                                region: e[i] || "N/A",
                                size: e[l] || "N/A",
                                uploader_discord_id: t.author.id,
                                uploader_name: t.author.username
                              };
                            if (!o.length)
                              try {
                                await G(
                                  h.qr_data,
                                  h.qr_image_url,
                                  h.qr_link,
                                  h.name,
                                  h.platform,
                                  h.region,
                                  h.size,
                                  h.uploader_discord_id,
                                  h.uploader_name
                                ),
                                  console.log("Saving in database! " + h.name);
                              } catch (e) {
                                console.log(e),
                                  await n.author.send(
                                    "something went wrong, send it to developer: \n```diff\n- " +
                                      e +
                                      "```"
                                  );
                              }
                          }
                      });
                  } catch (e) {
                    console.log(e);
                  }
                })(0, e)
              : "images" === t
              ? (async function(e, n) {
                  try {
                    const e = await M();
                    for (const {
                      id: t,
                      qr_image_url: a,
                      qr_link: o,
                      name: i,
                      platform: s,
                      region: l,
                      uploader_discord_id: r
                    } of e) {
                      const e = {
                        qr_image: g(o),
                        uploader_discord_id: r,
                        id: t
                      };
                      if ("null" === a) {
                        let t = i + s + l + r;
                        (t = t.replace(/[^a-z0-9]/gim, "")),
                          await $.a.outputFile(
                            e.qr_image,
                            "./img/" + t + ".jpg"
                          ),
                          x.a.access(
                            "./img/" + t + ".jpg",
                            x.a.F_OK,
                            async a => {
                              if (a) return void console.error(a);
                              const o = await n.channel.send("", {
                                files: ["./img/" + t + ".jpg"]
                              });
                              console.log(
                                o.attachments.values().next().value.proxyURL
                              ),
                                (e.qr_image = o.attachments
                                  .values()
                                  .next().value.proxyURL),
                                await C(e.id, e.qr_image);
                            }
                          );
                      }
                    }
                  } catch (e) {
                    console.log(e);
                  }
                })(0, e)
              : "edit" === t
              ? P(o, e)
              : "checkurls" === t
              ? j(V)
              : "updatesize" === t
              ? (async function() {
                  const e = await M();
                  for (const { id: n, qr_link: t, name: a, region: o } of e)
                    try {
                      console.log(`starting scanning ${a}`);
                      const e = await r.a.head(t, { timeout: 15e3 });
                      if (e && 404 !== e.status) {
                        let t;
                        e.headers["content-disposition"] &&
                          (t = e.headers["content-disposition"].match(
                            /\b\w*USA|JPN|EUR|GLOBAL|HACK|RF\w*\b/i
                          )),
                          e.headers["content-length"] &&
                            (await F(n, c()(e.headers["content-length"], !0)),
                            console.log(
                              c()(e.headers["content-length"], !0),
                              a,
                              n
                            )),
                          t &&
                            "N/A" === o &&
                            (console.log(t[0]), await B(n, t[0]));
                      }
                    } catch (e) {
                      e.response
                        ? console.log(e.response.status)
                        : console.log(e);
                    }
                })()
              : "stats" === t
              ? getStats(e)
              : e.channel.send("Command not found")
            : e.channel.send("You have no permissions to use this command")
          : e.channel.send("You have no permissions to use this command");
      p(e)
        ? e.channel.send(
            'You need to specify which command you want to use type "!qre help" to display available commands'
          )
        : e.channel.send(
            `You need to specify which command you want to use type "${H.get(
              e.guild.id
            )} help" to display available commands`
          );
    }
    V.on("ready", async () => {
      console.log("On Discord!"),
        console.log("Connected as " + V.user.tag),
        console.log("Servers:"),
        V.guilds.forEach(e => {
          H.set(e.id, Y),
            console.log(" - " + e.id),
            e.channels.forEach(e => {
              console.log(` -- ${e.name} (${e.type}) - ${e.id}`);
            }),
            console.log(H);
        }),
        setInterval(async () => {
          const e = await (async function() {
            try {
              return await D.findAndCountAll();
            } catch (e) {
              console.log(e);
            }
          })();
          await V.user.setActivity(`QR Codes count: ${e.count}`, {
            type: "PLAYING"
          });
        }, 6e4),
        setInterval(async () => {
          await j(V);
        }, 864e5);
    }),
      V.on("message", e => {
        if (e.author !== V.user)
          if ("dm" === e.channel.type) {
            if (!e.content.startsWith(`${Y}`))
              return e.channel.send(
                'You need to specify which command you want to use type "!qre help" to display available commands'
              );
            K(e);
          } else e.content.startsWith(`${H.get(e.guild.id)}`) && K(e);
      });
  }
]);
