const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'whois',
    description: 'takes in username as input and returns user information',
    execute(message) {

        let taggedUser = message.mentions.users.first();
        
        if (!taggedUser) {
            return message.channel.send(`${message.author}, that user cannot be found.\n    *(ex: $whois @TheRipBot)*`);
        } 
        const embed = new Discord.MessageEmbed();

        embed
            .setTitle(`**${taggedUser.username}**`)
            .setColor(16711680)
            .setThumbnail(taggedUser.avatarURL())
            .addField("**Username**", `${taggedUser.tag}`, true)
            .addField("**ID**", `${taggedUser.id}`, true) 
            .addField("**Status**", `${taggedUser.presence.status} ${ taggedUser.presence.clientStatus ? `on ${Object.keys(taggedUser.presence.clientStatus)}` : ''}`)
            .addField("Playing", `${ taggedUser.presence.activities.length ? taggedUser.presence.activities : "Nothing"}`)
        console.log(taggedUser.presence.activities)
        return message.channel.send(embed)
    }
};