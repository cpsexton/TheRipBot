const { Client, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();

    // get a timer int as argument. start a countdown. alert user of start and finish and respond to check time command
module.exports = {
    name: 'timer',
    description: 'gets time from argument. starts a countdown. alerts users of start and finish',
    execute(message, args){

        if(args[1] != parseInt(args[1])) {
            console.log('User: ' + `${message.author.username}` + ' entered ' + args[1] + ' instead of a number.');
            console.log("Argument is not an integer");
            message.channel.send(`${message.author.username}, please enter a number.\n *( ex: $timer 60 )* `)
            
            return;
        }
        
        // in future except arguments with seconds minutes hours $timer 5minutes
        console.log(`This command is not complete, ${message.author.username}`);
        message.channel.send(`Sorry ${message.author.username}, this command is under construction. Please pardon our dust. 🧰`);
    }
};
