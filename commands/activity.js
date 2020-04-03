const Discord = require('discord.js');
const { Collection } = require('discord.js');
const client = new Discord.Client();
client.commands = new Collection();

module.exports = {
    name: 'activity',
    description: 'sets the bots presence',
    async execute(message, args, client) {
    
        const actType = args[1].toUpperCase();
        const actName = args.slice(2).join(' ')

        client.user.setPresence({
            activity: {
                name: `${actName}`,
                type: `${actType}`
            }
        });

        if (actType === 'LISTENING') {
            await message.channel.send(`${message.author.username} set my activity to ${actType.toLowerCase()} to ${actName}`)
        } else {
            await message.channel.send(`${message.author.username} set my activity to ${actType.toLowerCase()} ${actName}`)
        }

    }
};
