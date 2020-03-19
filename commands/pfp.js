const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: "pfp",
    description: "Displays a user's profile picture",
    execute(message){
        let taggedUser = message.mentions.users.first();

        if(!taggedUser){
            return message.channel.send(`${message.author}, please tag a user`);
        }
        if(taggedUser){
            const embed = new Discord.MessageEmbed();
            embed
                .setTitle(`${taggedUser.username}'s profile picture`)
                .setImage(taggedUser.avatarURL())
                .setColor("#108274")
            return message.channel.send(embed);
        }
    }
}