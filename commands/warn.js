const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: "warn",
    description: " takes in a username and a reason and warns a user. ADMIN ONLY ",
    async execute(message, args) {
        let taggedUser = message.mentions.members.first();
        if (!taggedUser) {
            return message.channel.send(`${message.author}, that user cannot be found.\n    *(ex: $warn @TheRipBot cause you stink)*`);
        }
        let reason = args.slice(2).join(' ');
        if (!reason) reason = "No reason provided.";
        
        console.log(`User ${taggedUser.displayName} was warned by admin ${message.author.username} for the following reason: ${reason}`);
        
        const attachment = new Discord.MessageAttachment('./thumbnails/nodont.png');
		    return message.channel.send(`${taggedUser}! You have been warned by admin ${message.author.username}. \nReason: ${reason}.`, attachment);
    }
};
