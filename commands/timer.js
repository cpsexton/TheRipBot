const { Client, Collection } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

    // get a timer int as argument. start a countdown. alert user of start and finish and respond to check time command
module.exports = {
    name: 'timer',
    description: 'gets time from argument. starts a countdown. alerts users of start and finish',
    execute(message, args){

        // get time from user
        const timerAmount = args[0]

        if(timerAmount != parseInt(timerAmount) || timerAmount < 1 || timerAmount > 900) {
            console.log('User: ' + `${message.author.username}` + ' entered ' + timerAmount + ' instead of a number.');
            message.reply(` please enter a number.\n (1- 900seconds)`);   
        return;
        };

        message.reply(` started a ${timerAmount} second timer..`);
        bot.setTimeout(() => {
            message.reply('TIME HAS EXPIRED!') 
        }, timerAmount * 1000)

    }
};