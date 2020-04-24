const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();
 
module.exports = {
    name: "rolldice",
    description: "rolls a dice. user sets num of sides/faces and num of dice to be rolled",
    
    execute(message, args) {
        const numofsides = args[0];
        const numofdice = args[1];
        
        if(!numofsides || !numofdice || numofsides != parseInt(numofsides) || numofdice != parseInt(numofdice)) {
            message.reply(' please enter a number*(1-99)* of sides and dice.\n( $rolldice 12 2 <- rolls 2 12-sided dice)');   
            return;
        }; 

        const result = [];
        const reducer = (a, b) => a + b;       

            for (let count = numofdice; count > 0; count--) {
                let rollResult = Math.floor( Math.random() * Math.floor(numofsides) ) + 1;
                result.push(rollResult);
            };
        
        return message.reply(`you rolled:  ${result.join(', ')}   for a total of  ${result.reduce(reducer)}`);
    }
};
