const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: "kick",
    description: " takes in a username and kicks them from the server. does not ban user. ADMIN ONLY ",
    async execute(message, args) {

        let taggedUser = message.mentions.members.first();

        if (!taggedUser) {
            return message.channel.send(`${message.author}, that user cannot be found.\n    *(ex: $kick @TheRipBot)*`);
        }
        if (!taggedUser.kickable) {
            return message.reply("I cannot kick this user!")
        }

        let reason = args.slice(2).join(' ');
        if (!reason) reason = "No reason provided.";
        
        await taggedUser.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of: ${error}`));
        
        console.log(`User ${taggedUser} was kicked by admin ${message.author.username} for the following reason: ${reason}`);
        
        const embed = new Discord.MessageEmbed();
        embed
            .setTitle('USER KICKED')
            // .setThumbnail('.\thumbnails\POW.png')
            .addField(`${message.author.username} kicked:`, `${taggedUser}`)
            .addField('Reason',reason)

        return message.channel.send(embed)
    }
};