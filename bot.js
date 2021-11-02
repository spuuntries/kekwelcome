/*
        Kek's welcoming module for AU.
        Copyright (C) 2021 kekboi, Art Union org.

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU Affero General Public License as
        published by the Free Software Foundation, version 3 of the License only.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU Affero General Public License for more details.

        You should have received a copy of the GNU Affero General Public License
        along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

require("dotenv").config();
const procenv = process.env,
  Client = require("discord.js").Client,
  client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS"],
  }),
  pkg = require("./package.json"),
  gura = procenv.WEBURL.split("/webhooks/").pop();

// DB import snippet, due to a bit of a weird type declaration in Enmap,
// if developing, uncomment the one below, if in production, uncomment the one below it.

// DEV:
// const Enmap = require("enmap").default;
// const db = new Enmap({ name: "welcomed" });

// PRODUCTION:
const Enmap = require("enmap");
const db = new Enmap({ name: "welcomed" });

function logger(string = "logger logging") {
  console.log(`${new Date()}: ${string}`);
}

function login() {
  client.login(procenv.TOKEN).catch(() => {
    logger(`failed to login!\nRetrying in 5 secs...`);
    setTimeout(() => {
      login();
    }, 5000);
  });
}

login();

client.on("ready", () => {
  logger(`${client.user.tag} using ${pkg.name} v${pkg.version} ready!`);
});

client.on("messageCreate", (message) => {
  if (
    message.channel.id == procenv.CHANNELID &&
    !db.has(message.author.id) &&
    !message.author.bot &&
    !message.member.roles.cache.find((r) =>
      r.name.toLowerCase().includes("staff")
    ) &&
    !message.member.roles.cache.find((r) =>
      r.name.toLowerCase().includes("admin")
    )
  ) {
    let authid = message.author.id,
      welmotes = procenv.WELMOTES.split("|"),
      welcome = [
        `Yeblo <@${authid}>! Welcome!`,
        `!<@${authid}> emocleW`,
        `Welcome to AU, <@${authid}>!`,
        `Hey <@${authid}>, welcome!`,
        `Yello there <@${authid}>`,
        `Hi hi! Welcome! <@${authid}>`,
      ];
    client.fetchWebhook(gura.split("/")[0], gura.split("/")[1]).then((web) => {
      web
        .send({
          content: `${
            welcome[Math.floor(Math.random() * welcome.length)]
          } ${welmotes[Math.floor(Math.random() * welmotes.length)]}
            \n<@&${procenv.ROLEID}>`,
        })
        .then((m) => {
          if (m) {
            logger(`sent welcome message for ${message.author.tag}`);
          }
        })
        .catch((e) => {
          logger(`failed to send welcome message, reason:\n"${e}"`);
        });
    });
    db.set(message.author.id, true);
  }
});
