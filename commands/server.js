const { MessageEmbed, Client, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();

module.exports = {
    name: 'server',
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
            .addField("**Server name**", `${message.guild.name}`)
            .addField("**Owner**", `${message.guild.owner}`)
            .addField("**Total members**", `${message.guild.memberCount}`)
            .addField("**Region**", `${message.guild.region}`)
            .addField("**Roles**", `${roles()}`)
        ) 
    }
};
