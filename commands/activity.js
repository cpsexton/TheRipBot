const { Client, Collection } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: 'activity',
    description: 'sets the bots presence',
    async execute(message, args, bot) {
    
        const actType = args[0].toUpperCase();
        const actName = args.slice(1).join(' ');
        const typeArr = ['PLAYING','STREAMING','LISTENING','WATCHING','CUSTOM_STATUS'];

        if (!typeArr.includes(actType)) {
            return message.reply(`**${actType.toLowerCase()}** is not an available activity. \n (playing, streaming, listening, watching)`)
        };

        bot.user.setPresence({
            activity: {
                name: `${actName}`,
                type: `${actType}`
            }
        });

        await message.reply('activity change successful')

    }
};
