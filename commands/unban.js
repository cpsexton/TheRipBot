const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "unban",
    description: " takes in a user id and unbans them from the server. ADMIN ONLY ",
    async execute(message, args) {

        let taggedUser = args[0];

        if (!taggedUser) {
            return message.channel.send(`${message.author.username}, that user cannot be found.\n    *(ex: $unban 1234567890)*`);
        }

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided.";

        await message.guild.members.unban(taggedUser)
            .catch(error => message.reply(`Sorry ${message.author.username} I couldn't unban because of: ${error}`));

        console.log(`User with id ${taggedUser} was unbanned by admin ${message.author.username} for the following reason: ${reason}`);

        const embed = new MessageEmbed();
        embed
            .setTitle('USER UNBANNED')
            .setColor('GREEN')
            .addField(`${message.author.username} unbanned id:`, `${taggedUser}`)
            .addField('Reason',reason)
            .setFooter('Welcome back!')

        return message.channel.send(embed)
    }
};