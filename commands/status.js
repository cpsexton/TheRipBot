const { Client, Collection } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: 'status',
    description: 'changes the bots status. options include: online, idle, dnd',
    async execute(message, args, bot) {

        if(!args) { return message.reply(' please add a status. *(ex: $status idle/online/dnd)*') }

        const theStatus = args[0];

        await bot.user.setStatus(theStatus);
        await message.reply(` successfully updated status to ${theStatus}`);
    }
};
