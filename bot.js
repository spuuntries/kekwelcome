require("dotenv").config();
const procenv = process.env,
  Client = require("discord.js").Client,
  client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_WEBHOOKS"],
  }),
  pkg = require("./package.json");

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

client.on("message", (message) => {
  if (message.channel.id.toString() == procenv.CHANNELID) {
    let authid = message.author.id,
      welcome = [
        `Yeblo <@${authid}>! Welcome!`,
        `!<@${authid}> emocleW`,
        `Welcome to AU, <@${authid}>!`,
        `Hey <@${authid}>, welcome!`,
        `Yello there <@${authid}>`,
      ];
    client.fetchWebhook(procenv.WEBID, procenv.WEBTOKEN).then((web) => {
      web
        .send({ content: welcome[Math.floor(Math.random() * 6)] })
        .then((m) => {
          if (m) {
            logger(`sent welcome message for ${message.author.tag}`);
          }
        });
    });
    client
      .fetchWebhook(procenv.OTHERWEBID, procenv.OTHERWEBTOKEN)
      .then((web) => {
        web.send({
          content: `<@&${procenv.ROLEID}> ples emoclew ${message.author.tag}`,
        });
        logger(`sent ping to role`)
      });
  }
});
