const Discord = require('discord.js');
const {prefix, token} = require('C:/Users/cpsex/Desktop/Coding/DiscordBot/TheRipBot/config.json');
const client = new Discord.Client();
const embed = new Discord.MessageEmbed();
client.commands = new Discord.Collection();

module.exports = {
    name: 'help',
    description: 'returns embed with list of commands',
    execute(message, args) {
        
    }
}