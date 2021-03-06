const { Client, Collection } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: 'prune',
    description: 'returns details about the Guild aka Server',
    async execute(message, args) {
        const amount = parseInt(args[0]);
        const doomedMessages = await message.channel.messages.fetch({ limit: amount });

        function pruneMessages() {
            message.channel.bulkDelete(doomedMessages)
                .catch(error => message.reply(`I couldn't prune messages. Error: ${error}`))
                .then(message.channel.send(`${message.author.username} deleted ${amount} messages from the channel.`));
        }
        !amount || amount < 2 || amount > 50 ? message.reply("Prune how many messages? (2 - 50)") : pruneMessages();
    }
};
