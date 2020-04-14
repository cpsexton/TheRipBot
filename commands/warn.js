const { Client, Collection, MessageAttachment } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "warn",
    description: " takes in a username and a reason and warns a user. ADMIN ONLY ",
    async execute(message, args) {
        let taggedUser = message.mentions.members.first();
        if (!taggedUser) {
            return message.channel.send(`${message.author}, that user cannot be found.\n    *(ex: $warn @TheRipBot please stop spamming)*`);
        }
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided.";

        console.log(`User ${taggedUser.displayName} was warned by admin ${message.author.username} for the following reason: ${reason}`);

        const attachment = new MessageAttachment('./thumbnails/nodont.png');
		    return message.channel.send(`${taggedUser}! You have been warned by admin ${message.author.username}. \nReason: ${reason}.`, attachment);
    }
};