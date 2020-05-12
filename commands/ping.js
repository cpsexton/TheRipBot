const { Client, Collection } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: 'ping',
    description: 'gets users and api latency',
    async execute(message) {
        const m = await message.channel.send("Ping");
        m.edit(`Pong! Latency ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
    }
};
