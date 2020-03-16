const Discord = require('discord.js');
const client = new Discord.Client();
const embed = new Discord.MessageEmbed();
const ytdl = require('ytdl-core');
client.commands = new Discord.Collection();

    
            
            //dont forget to add the listener to indexjs with recognition of bot talking to itself