// const Discord = require('discord.js');
// const { Collection } = require('discord.js');
// const bot = new Client();
// bot.commands = new Collection();
 
//         // $rolldice 4 1  rolldice with 4 sides only the one
 
//     module.exports = {
//         name: "rolldice",
//         description: "rolls a die. user sets num of sides/faces and num of dice to be rolled",
     
//         async execute(message, args) {
//             const embed = new Discord.MessageEmbed();
            
//             if(!args[1] || !args[2]) {
//                console.log(`User: ${message.author.username} attempted to rolldice but they did not provide both arguments.`);
//                message.reply(' how many sides and how many dice would you like rolled?');   
//                return;
//             }; 
            
            
//             const theFinal = [ ];
//             const numofsides = args[1];
//             const numofdice = args[2];
            
//             function getRollResult() { 
//                 const rollResult = Math.floor( Math.random() * Math.floor(numofsides) ) + 1;
//                 return rollResult;
//             };
//             const totalRollValue = 
            
//             consecutiveRolls();

//             function consecutiveRolls(numofdice) {
//                 let count = numofdice;
//                 if (count = 0) {
//                     return;
//                 } else {
//                     getRollResult()
//                 }

//                 count --,
//                 consecutiveRolls()
//             }

// // for each roll result sent out by the getrollResult fuction add it to an array of 
// // return it in code like with the back ticks

//             return message.reply(` you rolled a ${theFinal}`)
//         // faceupvalue   numofsides  numofdice
         

//     }
// };
