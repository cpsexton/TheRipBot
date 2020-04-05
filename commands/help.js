const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'help',
    description: 'returns embed with list of commands',
    async execute(message) {
        const embed = new Discord.MessageEmbed();
            message.channel.send(embed
                .setColor('ORANGE')
                .setTitle("Command Help:")
                .addFields({ 
                    name: "prefix $",
                    value: "**Basic Commands**" 
                },{
                    name: "```hello``` ```online``` ```poll``` ```pfp``` ```serverinfo``` ```timer``` ```heal``` ```ping``` ```uptime``` ```whois``` ```covid```",
                    value: "**Mod Commands**" 
                },{
                    name: "```kick``` ```ban``` ```kill``` ```prune``` ```mute``` ```warn```",
                    value: "**Admin Commands**" 
                },{
                    name: "```sLogOn``` ```sLogOff``` ```status``` ```activity```",
                    value: "Under Construction" 
                },{
                    name: "```about``` ```rssfeed``` ```rolldice``` ```comic``` ```role``` ```profiles``` ```gamestats``` ```curecoronavirus```",
                    value: "kbye" 
                })
            )
    }
};