const { Client, Collection, MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "pfp",
    description: "Displays a user's profile picture",
    execute(message) {
        let taggedUser = message.mentions.users.first();

        if (!taggedUser) {
            return message.channel.send(`${message.author}, please tag a user`);
        } else {
            embed
                .setTitle(`${taggedUser.username}'s profile picture`)
                .setImage(taggedUser.avatarURL())
                .setColor("#108274")
            return message.channel.send(embed);
        }
    }
}