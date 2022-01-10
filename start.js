const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

dotenv.config();

require("./handler/events")(client);

client.login(process.env.TOKEN);