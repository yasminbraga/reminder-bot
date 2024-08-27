const { Client, GatewayIntentBits, Events } = require("discord.js");
const cron = require("node-cron");
const dotenv = require("dotenv");

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  trashReminder.start();
  eachMinuteMsg.start();
});

client.login(process.env.DISCORD_TOKEN);

const eachMinuteMsg = cron.schedule("* * * * *", () => {
  const channel = client.channels.cache.get("920676429052661793");
  channel.send("Todo minuto");
});

const trashReminder = cron.schedule(
  "0 18 * * 2,4,6",
  () => {
    const channel = client.channels.cache.get("920676429052661793");
    console.log("enviou a mensagem");
    channel.send("Hoje é dia de tirar o lixo!");
  },
  { timezone: "America/Sao_Paulo" }
);
