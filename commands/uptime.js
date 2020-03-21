const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();

module.exports = {
    name: "uptime",
    description: "Displays uptime of bot in an embed",
    execute(message, uptimeSeconds){
		let uptimeMinutes = 0
		if(uptimeSeconds == 60 && uptimeSeconds != 0){
			uptimeMinutes += 1
			uptimeSeconds -= 60
		}
		console.log(uptimeSeconds % 60 == 0)
		message.channel.send(embed
            .setTitle('Uptime')
            .setDescription(`${uptimeMinutes} ${ uptimeMinutes == 1 ? 'minute' : 'minutes' } ${uptimeSeconds} seconds`)
		)
    }
}