const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = {
    name: "heal",
    description: " will heal you with just a gaze. ",
    async execute(message) {

    const attachment = new Discord.MessageAttachment('./thumbnails/Braco-gaze2.jpg');

    message.channel.send('Behold the miracle gaze of Braco. Be healed!', attachment);
    }
};
