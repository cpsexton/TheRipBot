const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'online',
    description: "fetches guild member status's and filters through them. returns guild members status details",
    
    execute(message) {
        const embed = new Discord.MessageEmbed();

        message.guild.members.fetch().then(fetchedMembers => {
            const filterMembers = (status) => {
                return fetchedMembers.filter(member => member.presence.status === status).map(user => `${user}`).join(' \n');
            }
            console.log(filterMembers('idle'))
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