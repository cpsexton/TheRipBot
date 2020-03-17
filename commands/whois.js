const Discord = require('discord.js');
const client = new Discord.Client();
const embed = new Discord.MessageEmbed();
client.commands = new Discord.Collection();

module.exports = {
    name: 'whois',
    description: 'takes in username as input and returns user information',
    execute(message, args) {

        let taggedUser = message.mentions.users.first();
        let tUserGame = "Nothing";
        
        if (!args.length) {
            return message.channel.send(`${message.author}, you need to provide a user.\n    *(ex: $whois @TheRipBot)*`);
        } else if (!taggedUser) {
            return message.channel.send(`${message.author}, that user cannot be found.\n    *(ex: $whois @TheRipBot)*`);
        } else if (`${taggedUser.presence.activities}`) {
            let tUserGame = `${taggedUser.presence.activities}`
            
            message.channel.send(embed
                .setTitle(`**${taggedUser.username}**`)
                .setColor(16711680)
                .setThumbnail(taggedUser.avatarURL())
                .addField("**Username**", `${taggedUser.tag}`, true)
                .addField("**ID**", `${taggedUser.id}`, true)
                .addField("**Status**", `${taggedUser.presence.status}`)
                .addField("Playing", tUserGame)
            )
        } else {
            message.channel.send(embed
                .setTitle(`**${taggedUser.username}**`)
                .setColor(16711680)
                .setThumbnail(taggedUser.avatarURL())   
                .addField("**Username**", `${taggedUser.tag}`, true)
                .addField("**ID**", `${taggedUser.id}`, true) 
                .addField("**Status**", `${taggedUser.presence.status}`)
                .addField("Playing", tUserGame)
            )
        };
    }
};