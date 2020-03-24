const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'help',
    description: 'returns embed with list of commands',
    execute(message) {
        const embed = new Discord.MessageEmbed();
            message.channel.send(embed
                .setColor(255)
                .setThumbnail("https://github.com/cpsexton/TheRipBot/blob/97f8dcce7ffaeafc11216e23af19c6ae5f658ff3/thumbnails/POW.png")
                .setTitle("Categories:")
                .addField("**```$help basic```**", "Basic commands anyone can use")
                .addField("**```$help mod```**", "Special commands for mods")
                .addField("**```$help admin```**", "Admin commands")
                // .addField("**```$whois <username>```**", "Will respond with requested users information")
                // .addField("**```$pfp <username>```**", "Displays requested users profile picture")
                // .addField("**```$online```**", "See how many people are currently online and offline")
                // .addField("**```$uptime```**", "Shows how long the bot has been up")
                // .addField("**```$server```**", "Will respond with the server details")
                // .addField("**```$sLogOn```**", "Logs on to Steam as an anonymous user")
                // .addField("**```$sLogOff```**", "Logs off Steam")
                // .addField("**```$kick <username>```**", "Logs off Steam")
                // .addField("**```$ban <username>```**", "Logs off Steam")
            )
    }
};