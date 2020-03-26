const { Client, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();

    // get a timer int as argument. start a countdown. alert user of start and finish and respond to check time command
module.exports = {
    name: 'timer',
    description: 'gets time from argument. starts a countdown. alerts users of start and finish',
    execute(message, args){

        // get time from user
        const timerAmount = args[1]
        
        if(timerAmount != parseInt(timerAmount) || timerAmount < 1 || timerAmount > 900) {
            console.log('User: ' + `${message.author.username}` + ' entered ' + timerAmount + ' instead of a number.');
            message.reply(` please enter a number.\n (1- 900seconds)`);   
        return;
        };

        message.reply(` started a ${timerAmount} second timer..`);
        client.setTimeout(() => {
            message.reply('TIME HAS EXPIRED!') 
        }, timerAmount * 1000)

    }
};

            // set Timeout for that long
                // after timeout execute message to channel that times over
        // clear timeout

        // console.log(`This command is not complete, ${message.author.username}`);
        // message.channel.send(
        //     `This command is under construction. sorry... `,
        //     {files: ["./thumbnails/sorry.png"]}
        // )
