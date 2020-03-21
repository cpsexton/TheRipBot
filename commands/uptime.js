const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();

module.exports = {
    name: "uptime",
    description: "Displays uptime of bot in an embed",
    execute(message, time){
		// let uptimeMinutes = 0
		// if(uptimeSeconds == 60 && uptimeSeconds != 0){
		// 	uptimeMinutes += 1
		// 	uptimeSeconds -= 60
		// }
		console.log(time.minutes, time.seconds)
		message.channel.send(embed
            .setTitle('Uptime')
            .setDescription(`${time.minutes} ${ time.minutes == 1 ? 'minute' : 'minutes' } ${time.seconds - (time.minutes * 60)} seconds`)
		)
    }
}