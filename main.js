const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const express = require("express");
require("dotenv").config();

const ALLOWED_USERS = [
  "323627273884401674", // ID do usuário 1 leaf
  "689497303547248651"  // ID do usuário 2 joaozera
];

const DISPLAY_TIME = 10000;
let hideTimeout = null;

const queue = [];
let isDisplaying = false;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Reaction]
});

const STAR_EMOJI = "⭐";
  client.on("messageReactionAdd", async (reaction, user) => {

    if (reaction.partial) await reaction.fetch();
    if (reaction.emoji.name !== STAR_EMOJI) return;
    if (user.bot) return;

    // 🔒 BLOQUEIO POR USUÁRIO
    if (!ALLOWED_USERS.includes(user.id)) return;

    const msg = reaction.message;

  queue.push({
    username: msg.author.username,
    avatar: msg.author.displayAvatarURL({ extension: "png" }),
    content: msg.content,
    image: msg.attachments.first()?.url || null,
    timestamp: Date.now()
  });

  processQueue();
});

function processQueue() {
  if (isDisplaying || queue.length === 0) return;

  isDisplaying = true;
  const data = queue.shift();

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

  setTimeout(() => {
    fs.writeFileSync("data.json", JSON.stringify({ hide: true }));

    setTimeout(() => {
      isDisplaying = false;
      processQueue();
    }, 500); // tempo do fade-out
  }, DISPLAY_TIME);
}


client.login(process.env.DISCORD_TOKEN);

/* 🔥 SERVIDOR HTTP */
const app = express();
app.use(express.static(__dirname));

app.listen(5000, () => {
  console.log("Overlay rodando em http://localhost:5000/index.html");
});
