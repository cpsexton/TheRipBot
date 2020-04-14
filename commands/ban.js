const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "ban",
    description: " takes in a username and bans them from the server. ADMIN ONLY ",
    async execute(message, args) {

        let taggedUser = message.mentions.members.first();

        if (!taggedUser) {
            return message.channel.send(`${message.author.username}, that user cannot be found.\n    *(ex: $ban @TheRipBot)*`);
        }
        if (!taggedUser.bannable) {
            return message.reply("I cannot ban this user!")
        }

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided.";
        
        await taggedUser.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author.username} I couldn't ban because of: ${error}`));
        
        console.log(`User ${taggedUser.username} was banned by admin ${message.author.username} for the following reason: ${reason}`);
        
        const embed = new MessageEmbed();
        embed
            .setTitle('USER BANNED')
            .setColor('RED')
            .setThumbnail(taggedUser.user.avatarURL())
            .addField(`${message.author.username} banned:`, `${taggedUser}`)
            .addField('Reason',reason)

        return message.channel.send(embed)
    }
};