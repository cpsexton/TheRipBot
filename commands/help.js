const Discord = require('discord.js');
const client = new Discord.Client();
const embed = new Discord.MessageEmbed();
client.commands = new Discord.Collection();

    
module.exports = {
    name: 'help',
    description: 'returns embed with list of commands',
    execute(message, args) {        //takes in an argument for future scaling
        message.channel.send(embed
            .setColor(255)
            .setTitle("Commands:")
            .addField("**$help**","List of commands")
            .addField("**$whois <username>**","Will respond with requested users information")
            .addField("**$server**", "Will respond with the server details")
            .addField("**$hello**", "Get a what up from ya boi")
            .addField("**$online**", "See how many people are currently online and offline")
        )
    }
};