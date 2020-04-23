const { Client, Collection } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();
const moment = require('moment');
    // sends user the current day of week, date, and current time in EST
    module.exports = {
        name: 'date',
        description: 'gets time from argument. starts a countdown. alerts users of start and finish',
        
        execute(message){
            const now = moment().format("ddd, MMM Do YYYY, h:mm:ss a");
        
            message.reply(`currently it is ${now} est`);
        }
    };