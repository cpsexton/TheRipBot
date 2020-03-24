const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: 'whois',
    description: 'takes in username as input and returns user information',
    execute(message) {
        let taggedUser = message.mentions.users.first();
        let color = ''
        if (!taggedUser) {
            return message.channel.send(`${message.author}, that user cannot be found.\n    *(ex: $whois @TheRipBot)*`);
        } 

        const embed = new Discord.MessageEmbed();
        switch(taggedUser.presence.status){
            case 'online': color = '#43B581'; break;
            case 'idle': color = '#FAA61A'; break;
            case 'dnd': color = '#F04747'; break;
            default: color = "#747f8d"; break;
        }
        
        const capitalizeFirstLetter = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}
        const customActivity = () => taggedUser.presence.activities.map(activity => {return `${ activity.emoji ? activity.emoji.name : '' }` + `${ activity.state == null ? '' : activity.state }`});
        const activityType = () => taggedUser.presence.activities.map(activity => {if(activity.type.toLowerCase() == 'custom_status'){activity.type = "Custom status"}return `**${capitalizeFirstLetter(activity.type.toLowerCase())}**`});
        
        embed
            .setTitle(`**${taggedUser.username}**`)
            .setColor(color)
            .setThumbnail(taggedUser.avatarURL())
            .addField("**Username**", `${taggedUser.tag}`, true)
            .addField("**ID**", `${taggedUser.id}`, true) 
            .addField("**Status**", `${taggedUser.presence.status} ${ taggedUser.presence.clientStatus ? `on ${Object.keys(taggedUser.presence.clientStatus)}` : ''}`)
            .addField(`${ activityType().length ? activityType() : '**Activity**'}`, `${ taggedUser.presence.activities.length ? `${taggedUser.presence.activities == 'Custom Status' ? customActivity() : taggedUser.presence.activities}` : "Nothing"}`)
        return message.channel.send(embed)
    }
};