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
                .setTitle("Command Help:")
                .addFields({ 
                    name: "prefix $",
                    value: "**Basic Commands**" 
                },{ 
                    name: "```hello``` ```online``` ```pfp``` ```serverinfo``` ```timer``` ```uptime``` ```whois```",
                    value: "**Mod Commands**" 
                },{ 
                    name: "```kick``` ```ban``` ```kill``` ```prune```",
                    value: "**Admin Commands**" 
                },{ 
                    name: "```sLogOn``` ```sLogOff```",
                    value: "Under Construction" 
                },{
                    name: "```mute``` ```ping``` ```about``` ```rssfeed``` ```roll``` ```comic``` ```role``` ```pole``` ```profiles``` ```gamestats``` ```curecoronavirus```",
                    value: "kbye" 
                })
            )
    }
};