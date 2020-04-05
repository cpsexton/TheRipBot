const Discord = require('discord.js');
const { Collection } = require('discord.js');
const client = new Discord.Client();
client.commands = new Collection();

module.exports = {
    name: 'status',
    description: 'changes the bots status',
    async execute(message, args, client) {
        
        const theStatus = args[1];

        await client.user.setStatus(theStatus);
        await message.reply('status change successful');
    }
};
