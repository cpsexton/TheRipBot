const { Client, Collection } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

    // get a timer int as argument. start a countdown. alert user of start and finish and respond to check time command
module.exports = {
    name: 'ping',
    description: 'gets users and api latency',
    async execute(message){

        const m = await message.channel.send("Ping");
        m.edit(`Pong! Latency ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);

        console.log(`${message.author.username} requested a ping.`);
       
    }
};
