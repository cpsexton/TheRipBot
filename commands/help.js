const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

    // this is what it does //
module.exports = {
    name: 'help',
    description: 'returns embed with list of commands',
    execute(message) {        // can easily pass in an argument in future //
        
        const embed = new Discord.MessageEmbed();
        
        message.channel.send(embed
            .setColor(255)
            .setTitle("Commands:")
            .addField("**$help**","List of commands")
            .addField("**$hello**", "Get a what up from ya boi")
            .addField("**$whois <username>**","Will respond with requested users information")
            .addField("**$online**", "See how many people are currently online and offline")
            .addField("**$pfp**", "Displays requested users profile picture")
            .addField("**$server**", "Will respond with the server details")
            .addField("**$sLogOn**", "Logs on to Steam as an anonymous user")
            .addField("**$sLogOff**", "Logs off Steam")
        )
    }
};