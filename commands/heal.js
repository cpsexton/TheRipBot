const { Client, Collection, MessageAttachment } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "heal",
    description: " will heal you with just a gaze. ",
    async execute(message) {

    const attachment = new MessageAttachment('./thumbnails/Braco-gaze2.jpg');

    message.channel.send('Behold the miracle gaze of Braco. Be healed!', attachment);
    }
};
