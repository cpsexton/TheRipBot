const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

    // reacts to users message with whatup in emojis //
module.exports = {
    name: 'hello',
    description: 'gets a what up from ya boi',
    async(message) => {  // needs to be an async function //
        execute = {
        try {
            await message.react('🇼');
            await message.react('🇭');
            await message.react('🇦');
            await message.react('🇹');
            await message.react('🇺');
            await message.react('🇵');
        } catch (error) {
            console.error('One of the emojis failed to react.')
        }
    }
    }
}