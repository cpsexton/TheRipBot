const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: 'serverinfo',
    description: 'returns details about the Guild aka Server',
    execute(message) {
        const embed = new MessageEmbed();

        const roles = () => {
            let roleList = []
            message.guild.roles.cache.map(roles => {
                roleList.push(roles.name)
            })
            return roleList.join(' \n')
        };

        message.channel.send(embed
            .setColor(65280)
            .setTitle('**Server Information**')
            .setThumbnail(`${message.guild.iconURL()}`)
            .addFields(
                { name: "**Server name**", value: `${message.guild.name}` },
                { name: "**Owner**", value: `${message.guild.owner}` },
                { name: "**Total members**", value: `${message.guild.memberCount}` },
                { name: "**Region**", value: `${message.guild.region}` },
                { name: "**Roles**", value: `${roles()}` },
            )
        )
    }
};
