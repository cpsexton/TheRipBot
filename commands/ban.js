const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: "ban",
    description: " takes in a username and bans them from the server. ADMIN ONLY ",
    async execute(message, args) {

        let taggedUser = message.mentions.members.first();

        if (!taggedUser) {
            return message.channel.send(`${message.author}, that user cannot be found.\n    *(ex: $ban @TheRipBot)*`);
        }
        if (!taggedUser.bannable) {
            return message.reply("I cannot ban this user!")
        }

        let reason = args.slice(2).join(' ');
        if (!reason) reason = "No reason provided.";
        
        await taggedUser.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of: ${error}`));
        
        console.log(`User ${taggedUser} was banned by admin ${message.author} for the following reason: ${reason}`);
        
        const embed = new Discord.MessageEmbed();
        embed
            .setTitle('USER BANNED')
            .setThumbnail(taggedUser.user.avatarURL())
            .addField(`${message.author.username} banned:`, `${taggedUser}`)
            .addField('Reason',reason)

        return message.channel.send(embed)
    }
};