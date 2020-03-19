const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'online',
    description: "fetches guild member status's and filters through them. returns guild members status details",
    execute(message) {
        const embed = new Discord.MessageEmbed();

        message.guild.members.fetch().then(fetchedMembers => {
            let totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
            let totalOffline = fetchedMembers.filter(member => member.presence.status === 'offline');

            message.channel.send(embed
                .setTitle('Currently')
                .setColor(16776960)
                .addField('**Online**', `${totalOnline.size}`, true)
                .addField('**Offline**',`${totalOffline.size}`, true)
            )
        })

    }
};