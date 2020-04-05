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
        const typeArr = ['PLAYING','STREAMING','LISTENING','WATCHING','CUSTOM_STATUS']

        if (!typeArr.includes(actType)) {
            return message.reply(`**${actType.toLowerCase()}** is not an available activity. \n (playing, streaming, listening, watching)`)
        }

        client.user.setPresence({
            activity: {
                name: `${actName}`,
                type: `${actType}`
            }
        });

        await message.reply('activity change successful')

    }
};
