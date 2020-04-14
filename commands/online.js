const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: 'online',
    description: "fetches guild member status's and filters through them. returns guild members status details",

    execute(message) {
        const embed = new MessageEmbed();

        message.guild.members.fetch().then(fetchedMembers => {
            const filterMembers = (status) => {
                return fetchedMembers.filter(member => member.presence.status === status).map(user => `${user}`).join(' \n');
            }
            message.channel.send(embed
                .setTitle('Currently')
                .setColor(16776960)
                .addField('**Online**', `${filterMembers('online')}`, true)
                .addField('**Idle**', `${ filterMembers('idle') ? filterMembers('idle') : 'N/A'}`, true)
                .addField('**Offline**',`${ filterMembers('offline') ? filterMembers('offline') : 'N/A'}`, true)
            )
        })

    }
};