const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'server',
    description: 'returns details about the Guild aka Server',
    execute(message, args) {
        
        const embed = new Discord.MessageEmbed();
        
        message.channel.send(embed
            .setColor(65280)
            .setTitle('**Server Information**')
            .setThumbnail(`${message.guild.iconURL()}`)
            .addField("**Server name**", `${message.guild.name}`)
            .addField("**Owner**", `${message.guild.owner}`)
            .addField("**Total members**", `${message.guild.memberCount}`)
            .addField("**Region**", `${message.guild.region}`)
            .addField("**Roles**", `${message.guild.roles.fetch()}`)
        ) 
    },
};