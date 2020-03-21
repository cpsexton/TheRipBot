const { MessageEmbed, Guild, Client, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();

module.exports = {
    name: "pfp",
    description: "Displays a user's profile picture",
    execute(message){
        let taggedUser = message.mentions.users.first();

        if(!taggedUser){
            return message.channel.send(`${message.author}, please tag a user`);
        }
        if(taggedUser){
            const embed = new MessageEmbed();
            embed
                .setTitle(`${taggedUser.username}'s profile picture`)
                .setImage(taggedUser.avatarURL())
                .setColor("#108274")
            return message.channel.send(embed);
        }
    }
}