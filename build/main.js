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
      o = t(6),
      i = t.n(o),
      s = t(1);
    i.a.config();
    const l = s.Sequelize.Op,
      r = new s.Sequelize(process.env.DATABASE_URL, {
        define: { timestamps: !1 }
      });
    r.authenticate()
      .then(() => {
        console.log(
          "sequelize -> Connection has been established successfully."
        );
      })
      .catch(e => {
        console.error("sequelize -> Unable to connect to the database:", e);
      });
    class d extends s.Sequelize.Model {}
    async function c(
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
      c
    ) {
      try {
        const u = await d.create({
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
          await c.channel.send("Saving in database!"),
          console.log("DB -> save qr in DB"),
          u.id
        );
      } catch (e) {
        await c.channel.send(
          "something went wrong, send it to developer: \n```diff\n- " +
            e +
            "```"
        ),
          console.log(e);
      }
    }
    async function u(e) {
      let n = [];
      e.split(" ").forEach(e => {
        n.push({ name: { [l.iLike]: `%${e}%` } });
      });
      try {
        return await d.findAll({ where: { [l.and]: n } });
      } catch (e) {
        console.log(e);
      }
    }
    async function m() {
      try {
        return await d.findAll();
      } catch (e) {
        console.log(e);
      }
    }
    async function g(e, n) {
      try {
        await d.update({ qr_image_url: n }, { where: { id: e } }),
          console.log("DB -> updating qr url image");
      } catch (e) {
        console.log(e);
      }
    }
    async function h(e, n) {
      try {
        const t = await d.update({ size: n }, { where: { id: e } });
        return console.log("DB -> updating size for id: " + e), t;
      } catch (e) {
        console.log(e);
      }
    }
    async function p(e, n) {
      try {
        const t = await d.update({ thumbnail: n }, { where: { id: e } });
        return console.log("DB -> updating thumbnail for id: " + e), t;
      } catch (e) {
        console.log(e);
      }
    }
    async function f(e, n) {
      try {
        const t = await d.update({ region: n }, { where: { id: e } });
        return console.log("DB -> updating region for id: " + e), t;
      } catch (e) {
        console.log(e);
      }
    }
    d.init(
      {
        id: {
          type: s.Sequelize.INTEGER,
          autoIncrement: !0,
          allowNull: !1,
          primaryKey: !0
        },
        qr_data: { type: s.Sequelize.TEXT, allowNull: !1 },
        qr_image_url: { type: s.Sequelize.TEXT, allowNull: !1 },
        qr_link: { type: s.Sequelize.STRING, allowNull: !1 },
        name: { type: s.Sequelize.STRING, allowNull: !1 },
        thumbnail: { type: s.Sequelize.STRING, allowNull: !0 },
        platform: { type: s.Sequelize.STRING, allowNull: !1 },
        region: { type: s.Sequelize.STRING, allowNull: !1 },
        size: { type: s.Sequelize.STRING, allowNull: !1 },
        uploader_discord_id: { type: s.Sequelize.STRING, allowNull: !1 },
        uploader_name: { type: s.Sequelize.STRING, allowNull: !1 }
      },
      { sequelize: r, modelName: "qre_items" }
    ),
      r.sync();
    var w = t(7),
      y = t.n(w),
      E = t(4),
      S = t(2),
      _ = t.n(S),
      b = t(5),
      R = t.n(b);
    function A(e) {
      return e && e.match(M.GDRIVE)
        ? (function(e) {
            return e.replace(
              /\/file\/d\/(.+)\/(.+)/,
              "/uc?export=download&id=$1"
            );
          })(e)
        : e && e.match(M.DROPBOX)
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
    function I(e) {
      let n = y()(0, "L");
      return n.addData(`${e}`), n.make(), n.createASCII(2, 1);
    }
    function v(e) {
      let n = y()(0, "M");
      return n.addData(`${e}`), n.make(), n.createDataURL(5, 5);
    }
    async function N(e, n, t, o) {
      const i = [];
      for (const {
        id: n,
        name: t,
        platform: o,
        region: s,
        size: l,
        uploader_name: r,
        qr_image_url: d,
        thumbnail: c
      } of e) {
        const e = c || (await L(t, n));
        i.push(
          new a.RichEmbed()
            .setImage(d)
            .addField("Name: ", t, !0)
            .addField("DB ID: ", n, !0)
            .addField("Platform: ", o, !0)
            .addField("Region: ", s, !0)
            .addField("Size: ", l)
            .addField("QR:", "===================", !0)
            .addField("Author: ", r, !0)
            .setThumbnail(e)
        );
      }
      return (
        await n.channel.messages.get(t).delete(),
        new E.Embeds()
          .setArray(i)
          .setAuthorizedUsers([n.author.id])
          .setChannel("pm" === o ? n.author : n.channel)
          .setPageIndicator(!0)
          .setPage(1)
          .setTitle("Qr Code 3DS games search collection")
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
    function O(e) {
      return "dm" === e.channel.type;
    }
    function q(e) {
      return Object.keys(M)
        .filter(n => e.includes(n))
        .reduce((e, n) => ((e[n] = M[n]), e), {});
    }
    async function T(e) {
      const n = await _.a.head(e, { timeout: 15e3 });
      if (n && 404 !== n.status && n.headers["content-length"])
        return R()(n.headers["content-length"], !0);
    }
    async function D(e) {
      let n = encodeURI(
        `${"https://api.tenor.com/v1/random"}?key=${"T64EWZS77O3H"}&q=${e}&contentfilter=${"medium"}&media_filter=minimal&limit=1`
      );
      return (await _.a.get(n)).data.results[0].media[0].gif.url;
    }
    function G(e) {
      if (!O(e))
        return !!process.env.BOT_PERMISSIONS_GUILD.includes(e.guild.id);
    }
    async function L(e, n) {
      let t = {
        headers: {
          "user-key": process.env.IGDB_TOKEN,
          Accepts: "application/json"
        }
      };
      try {
        const a = e.replace(/[^a-zA-Z0-9 ]/gm, ""),
          o = await _.a.get(
            `https://api-v3.igdb.com/games/?search=${a}}&fields=id,name,cover`,
            t
          );
        if ((console.log(o.data[0].cover), o.data.length)) {
          const e = await _.a.get(
            `https://api-v3.igdb.com/covers/${o.data[0].cover}/?fields=url`,
            t
          );
          return (
            console.log(e.data[0].url),
            n && (await p(n, `https:${e.data[0].url}`)),
            `https:${e.data[0].url}`
          );
        }
        n &&
          (await p(
            n,
            "https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png"
          ));
      } catch (e) {}
    }
    t(6).config();
    const M = {
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
    var B = t(9),
      C = t.n(B),
      $ = t(10),
      F = t.n($),
      k = t(11),
      U = t.n(k);
    var P = t(3),
      z = t.n(P);
    async function x(e, n, t) {
      try {
        if (5 !== e.length)
          return n.channel.send("invalid arguments count for upload command");
        const o = await D("head-pat-anime"),
          i = (await n.channel.send("wait a moment...", { files: [o] })).id,
          s = q(["URL", "TITLE", "REGIONS", "PLATFORMS"]);
        let l = {};
        for (const t in s) {
          const a = await e.findIndex(e => s[t].test(e));
          if (-1 === a)
            return await n.channel.send(
              `invalid arguments \`${t}\` for upload command`
            );
          (l[t] = e[a]), e.splice(a, 1);
        }
        const r = {
          name: l.TITLE.replace(/['"]+/g, ""),
          qr_link: A(l.URL),
          qr_data: I(A(l.URL)),
          qr_image_url: v(A(l.URL)),
          platform: l.PLATFORMS,
          region: l.REGIONS,
          size: await T(A(l.URL)),
          uploader_discord_id: n.author.id,
          uploader_name: n.author.username
        };
        let d = r.name + r.platform + r.region + r.uploader_discord_id;
        (d = d.replace(/[^a-z0-9]/gim, "").replace(/\s+/g, "")),
          await z.a.outputFile(r.qr_image_url, "./img/" + d + ".jpg");
        const m = await u(r.name),
          g =
            0 === m.length
              ? "```diff\n+ This is how it will look, save in database? Type 'yes'/'no'\n```"
              : "```diff\n- I FOUND THE GAMES WITH SIMILAR NAME, CHECK THEM BEFORE SAYING 'yes' BY TYPING 'search'\"\n``````diff\n+ This is how it will look, save in database? Type 'yes'/'no' or 'search' if you want to check about what games I was talking about :)\"\n```";
        setTimeout(async () => {
          n.channel.messages.get(i).delete(),
            await n.channel
              .send("", { files: ["./img/" + d + ".jpg"] })
              .then(e => {
                r.qr_image_url = e.attachments.values().next().value.proxyURL;
              }),
            await n.channel.send(
              `\`\`\`\nLink: ${r.qr_link}\n\nName: ${r.name}\nPlatform: ${r.platform}\nRegion: ${r.region}\nSize: ${r.size}\nUploader: ${r.uploader_name}\`\`\`${g}`
            );
        }, 3e3);
        const h = new a.MessageCollector(
          n.channel,
          e => e.author.id === n.author.id,
          { time: 6e4 }
        );
        h.on("collect", async e => {
          if ("yes" === e.content.toLowerCase()) {
            h.stop();
            try {
              r.id = await c(r, n);
              const e = (async function(e, n, t) {
                const o = [];
                console.log(e);
                const i = await L(e.id, e.name);
                return (
                  o.push(
                    new a.RichEmbed()
                      .setImage(e.qr_image_url)
                      .addField("Name: ", e.name, !0)
                      .addField("DB ID: ", e.id, !0)
                      .addField("Platform: ", e.platform, !0)
                      .addField("Region: ", e.region, !0)
                      .addField("Size: ", e.size)
                      .addField("QR: ", "===================", !0)
                      .addField("Author: ", e.uploader_name, !0)
                      .setThumbnail(
                        i ||
                          "https://cdn4.iconfinder.com/data/icons/nintendo-console-line-set/32/ico-line-3ds-512.png"
                      )
                  ),
                  new E.Embeds()
                    .setArray(o)
                    .setPageIndicator(!1)
                    .setAuthorizedUsers([])
                    .setChannel(
                      t.channels.get(process.env.BOT_SUBSCRIPTION_CHANNEL)
                    )
                    .setPage(1)
                    .setTitle("QR Code 3DS games")
                    .setFooter("Bot created by: ProPanek#0188")
                    .setColor(0)
                    .setDisabledNavigationEmojis(["ALL"])
                    .setTimeout(6e5)
                );
              })(r, 0, t);
              await e.build();
            } catch (e) {
              console.log(e),
                await n.channel.send(
                  `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
                );
            }
          } else if ("no" === e.content.toLowerCase()) {
            h.stop();
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
              const e = await N(m, n);
              await e.build();
            } catch (e) {
              console.log(e),
                await n.channel.send(
                  `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
                );
            }
        }),
          h.on("end", async () => {
            await n.channel.send("upload session ended");
          });
      } catch (e) {
        console.log(e),
          await n.channel.send(
            `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
          );
      }
    }
    async function j(e, n) {
      try {
        const t = parseInt(e[1]),
          o = await (async function(e) {
            try {
              return await d.findAll({ where: { id: e }, limit: 1 });
            } catch (e) {
              console.log(e);
            }
          })(t),
          {
            qr_data: i,
            qr_image_url: s,
            qr_link: l,
            name: r,
            platform: c,
            region: u,
            size: m,
            uploader_discord_id: g,
            uploader_name: h
          } = o[0];
        if (o.length) {
          await n.channel.send(
            `\`\`\`\nLink: ${l}\n\nName: ${r}\nPlatform: ${c}\nRegion: ${u}\nSize: ${m}\nUploader: ${h}\`\`\` \n        \`\`\`Is this the game you wish to edit? type 'yes'/'no'\`\`\``,
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
                  .match(M.ARGUMENTS),
                p = q(["URL", "TITLE", "REGIONS", "PLATFORMS", "SIZE"]);
              let f = {};
              for (const e in p) {
                console.log(p[e]);
                const t = o.findIndex(n => p[e].test(n));
                -1 === t
                  ? await n.channel.send(
                      `argument \`${e}\` is missing continue...`
                    )
                  : ((f[e] = o[t]),
                    o.splice(t, 1),
                    await n.channel.send(
                      `argument \`${e}\` is present! : \`${f[e]}\``
                    ));
              }
              console.log(f);
              const w = {
                name: f.TITLE ? f.TITLE.replace(/['"]+/g, "") : r,
                qr_link: f.URL ? f.URL : l,
                qr_data: f.URL ? I(f.URL) : i,
                qr_image_url: f.URL ? v(f.URL) : s,
                platform: f.PLATFORMS ? f.PLATFORMS : c,
                region: f.REGIONS ? f.REGIONS : u,
                size: f.SIZE ? f.SIZE : m,
                uploader_discord_id: g,
                uploader_name: h
              };
              let y = "";
              if (f.URL) {
                let e = w.name + w.platform + w.region + w.uploader_discord_id;
                (e = e.replace(/[^a-z0-9]/gim, "")),
                  await z.a.outputFile(w.qr_image_url, "./img/" + e + ".jpg"),
                  await n.channel
                    .send("", { files: ["./img/" + e + ".jpg"] })
                    .then(e => {
                      w.qr_image_url = e.attachments
                        .values()
                        .next().value.proxyURL;
                    }),
                  (y = await T(f.URL));
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
                c,
                u
              ) {
                try {
                  await d.update(
                    {
                      qr_data: n,
                      qr_image_url: t,
                      qr_link: a,
                      name: o,
                      platform: i,
                      region: s,
                      newSize: c,
                      uploader_discord_id: l,
                      uploader_name: r
                    },
                    { where: { id: e } }
                  ),
                    await u.channel.send("Edited!"),
                    console.log("DB -> save qr in DB");
                } catch (e) {
                  await u.channel.send(
                    "something went wrong, send it to developer: \n```diff\n- " +
                      e +
                      "```"
                  ),
                    console.log(e);
                }
              })(t, w, y || w.size, n);
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
    var V = t(8),
      Y = t.n(V);
    async function H(e) {
      await e.channels
        .get("604692367018033152")
        .send("Checking urls started... I will do it every 24 hours");
      const n = await m();
      for (const { id: t, qr_link: a, name: o, uploader_discord_id: i } of n)
        try {
          console.time(`scanningTime - ${o}`),
            await _.a.head(a, { timeout: 3e4 }),
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
      });
    const K = new a.Client();
    let W = process.env.BOT_DEFAULT_INVOKE,
      X = new Map();
    function Z(e) {
      let n, t;
      const o = (n = O(e)
        ? e.content.substr(W.length + 1)
        : e.content.substr(X.get(e.guild.id).length + 1)).match(M.ARGUMENTS);
      if (
        (null !== o && o.length && (t = o[0]),
        console.log(t),
        t ||
          (O(e)
            ? e.channel.send(
                'You need to specify which command you want to use type "!qre help" to display available commands'
              )
            : e.channel.send(
                `You need to specify which command you want to use type "${X.get(
                  e.guild.id
                )} help" to display available commands`
              )),
        "help" === t)
      )
        return (function(e, n, t) {
          const o = [];
          return (
            O(n)
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
                      "```" + e.get(n.guild.id) + " invoke <new_command> ```"
                    )
                    .addField(
                      "Example: ",
                      "```" + e.get(n.guild.id) + "invoke %qre```"
                    )
                )),
            new E.Embeds()
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
        })(X, e).build();
      if ("search" === t)
        return (async function(e, n) {
          try {
            let t = e.split(" ");
            t.splice(0, 1);
            let a = t.join(" ");
            const o = await u(a);
            if (0 === o.length)
              return O(n)
                ? await n.channel.send(
                    `I didn't find anything called \`${a}\` in my database. If you want to request games join https://discord.gg/tXJfdNp`
                  )
                : await n.channel.send(
                    `I didn't find anything called \`${a}\` in my database. You can request game on <#582262747937505290> channel`
                  );
            {
              const e = await D("anime"),
                t = (await n.channel.send("wait a moment...", { files: [e] }))
                  .id,
                a = await N(o, n, t);
              await a.build();
            }
          } catch (e) {
            console.log(e),
              await n.channel.send(
                `something went wrong, send it to developer: \n\`\`\`diff\n- ${e}\`\`\``
              );
          }
        })(n, e);
      if (
        ("headpat" === t &&
          G(e) &&
          (async function(e, n) {
            if (2 !== e.length)
              return n.channel.send("hey, specify who you want to headpat!");
            n.channel.messages.get(n.id).delete();
            const t = await D("head-pat-anime"),
              o = new a.RichEmbed()
                .setColor(
                  `${"#" + Math.floor(16777215 * Math.random()).toString(16)}`
                )
                .setDescription(`uwu *<@${n.author.id}> headpats <@${e[1]}>*`)
                .setImage(t);
            n.channel.send(o);
          })(o, e),
        "upload" === t)
      )
        return G(e) &&
          (function(e) {
            if (!O(e))
              return !!e.member.roles.some(e =>
                process.env.BOT_PERMISSIONS_ROLES.includes(e.name)
              );
          })(e)
          ? x(o, e, K)
          : e.channel.send("You need to have permissions to use this command");
      if (
        G(e) &&
        (function(e) {
          if (!O(e))
            return !!e.member.roles.some(e =>
              process.env.BOT_PERMISSIONS_ADMIN.includes(e.name)
            );
        })(e)
      ) {
        if ("invoke" === t)
          return (function(e, n, t) {
            return "dm" === n.channel.type
              ? n.channel.send("This command is available only in servers")
              : e.length > 3
              ? n.channel.send("Too much arguments for invoke command")
              : e[1]
              ? (t.set(n.guild.id, e[1]),
                n.channel.send("Successfully changed your invoke command"))
              : void 0;
          })(o, e, X);
        if ("scrap" === t)
          return (async function(e, n) {
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
                      let e = t.content.match(M.SCRAPER);
                      if (!e) continue;
                      let a = (e = e
                        .map(Function.prototype.call, String.prototype.trim)
                        .filter(function(e) {
                          if (null !== e && " " !== e) return e;
                        }))[0];
                      a &&
                        (a = a.replace(/^"(.*)"$/, "$1").replace(/'/g, "''")),
                        e.shift();
                      const { rows: o } = await u(a);
                      if (o.length) {
                        console.log(
                          "Game is already in DB " + a + " Skipping..."
                        );
                        continue;
                      }
                      const i = e.findIndex(e => M.REGIONS.test(e)),
                        s = e.findIndex(e => M.PLATFORMS.test(e)),
                        l = e.findIndex(e => M.SIZE.test(e)),
                        r = await C()(
                          `${t.attachments.values().next().value.proxyURL}`
                        ),
                        d = await r.buffer(),
                        m = await F.a.read(d).catch(e => {
                          console.log(e);
                        });
                      if (!m) continue;
                      const g = await new U.a(),
                        h = await new Promise((e, n) => {
                          (g.callback = (t, a) => {
                            null != t ? n(t) : e(a);
                          }),
                            g.decode(m.bitmap);
                        }).catch(e => {
                          console.log(e);
                        }),
                        p = {
                          name: a,
                          qr_link: h.result,
                          qr_data: await I(h.result),
                          qr_image_url: null,
                          platform: e[s] || "3DS",
                          region: e[i] || "N/A",
                          size: e[l] || "N/A",
                          uploader_discord_id: t.author.id,
                          uploader_name: t.author.username
                        };
                      if (!o.length)
                        try {
                          await c(
                            p.qr_data,
                            p.qr_image_url,
                            p.qr_link,
                            p.name,
                            p.platform,
                            p.region,
                            p.size,
                            p.uploader_discord_id,
                            p.uploader_name
                          ),
                            console.log("Saving in database! " + p.name);
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
          })(0, e);
        if ("images" === t)
          return (async function(e, n) {
            try {
              const e = await m();
              for (const {
                id: t,
                qr_image_url: a,
                qr_link: o,
                name: i,
                platform: s,
                region: l,
                uploader_discord_id: r
              } of e) {
                const e = { qr_image: v(o), uploader_discord_id: r, id: t };
                if ("null" === a) {
                  let t = i + s + l + r;
                  (t = t.replace(/[^a-z0-9]/gim, "")),
                    await z.a.outputFile(e.qr_image, "./img/" + t + ".jpg"),
                    Y.a.access("./img/" + t + ".jpg", Y.a.F_OK, async a => {
                      if (a) return void console.error(a);
                      const o = await n.channel.send("", {
                        files: ["./img/" + t + ".jpg"]
                      });
                      console.log(o.attachments.values().next().value.proxyURL),
                        (e.qr_image = o.attachments
                          .values()
                          .next().value.proxyURL),
                        await g(e.id, e.qr_image);
                    });
                }
              }
            } catch (e) {
              console.log(e);
            }
          })(0, e);
        if ("edit" === t) return j(o, e);
        if ("checkurls" === t) return H(K);
        if ("updatesize" === t)
          return (async function() {
            const e = await m();
            for (const { id: n, qr_link: t, name: a, region: o } of e)
              try {
                console.log(`starting scanning ${a}`);
                const e = await _.a.head(t, { timeout: 15e3 });
                if (e && 404 !== e.status) {
                  let t;
                  e.headers["content-disposition"] &&
                    (t = e.headers["content-disposition"].match(
                      /\b\w*USA|JPN|EUR|GLOBAL|HACK|RF\w*\b/i
                    )),
                    e.headers["content-length"] &&
                      (await h(n, R()(e.headers["content-length"], !0)),
                      console.log(R()(e.headers["content-length"], !0), a, n)),
                    t && "N/A" === o && (console.log(t[0]), await f(n, t[0]));
                }
              } catch (e) {
                e.response ? console.log(e.response.status) : console.log(e);
              }
          })();
      }
      return e.channel.send(
        'You need to specify which command you want to use type "!qre help" to display available commands'
      );
    }
    !(async function() {
      try {
        await K.login(process.env.BOT_TOKEN);
      } catch (e) {
        console.log(e);
      }
    })(),
      K.on("ready", async () => {
        console.log("On Discord!"),
          console.log("Connected as " + K.user.tag),
          console.log("Servers:"),
          K.guilds.forEach(e => {
            X.set(e.id, W),
              console.log(" - " + e.id),
              e.channels.forEach(e => {
                console.log(` -- ${e.name} (${e.type}) - ${e.id}`);
              }),
              console.log(X);
          }),
          setInterval(async () => {
            const e = await (async function() {
              try {
                return await d.findAndCountAll();
              } catch (e) {
                console.log(e);
              }
            })();
            await K.user.setActivity(`QR Codes count: ${e.count}`, {
              type: "PLAYING"
            });
          }, 6e4),
          setInterval(async () => {
            await H(K);
          }, 864e5);
      }),
      K.on("message", e => {
        if (e.author !== K.user)
          if ("dm" === e.channel.type) {
            if (!e.content.startsWith(`${W}`))
              return e.channel.send(
                'You need to specify which command you want to use type "!qre help" to display available commands'
              );
            Z(e);
          } else e.content.startsWith(`${X.get(e.guild.id)}`) && Z(e);
      });
  }
]);
