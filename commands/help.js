const { Client, Collection, MessageEmbed } = require('discord.js');
const client = new Client();
client.commands = new Collection();

module.exports = {
    name: 'help',
    description: 'returns embed with list of commands',
    async execute(message) {
        const embed = new MessageEmbed();
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
                    name: "```kick``` ```ban``` ```unban``` ```prune``` ```mute``` ```warn```",
                    value: "**Admin Commands**" 
                },{
                    name: "```sLogOn``` ```sLogOff``` ```status``` ```kill``` ```activity```",
                    value: "Under Construction" 
                },{
                    name: "```about``` ```rolldice``` ```comic``` ```role``` ```profiles``` ```gamestats```",
                    value: "kbye" 
                })
            )
    }
};