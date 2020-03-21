const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();

module.exports = {
    name: "uptime",
    description: "Displays uptime of bot in an embed",
    execute(message, time){
		message.channel.send(embed
            .setTitle('Uptime')
            .setDescription(` ${time.hours} ${ time.hours == 1 ? 'hour' : 'hours' } ${time.minutes - (time.hours * 60)} ${ time.minutes == 1 ? 'minute' : 'minutes' } ${time.seconds - (time.minutes * 60)} seconds`)
		)
    }
}