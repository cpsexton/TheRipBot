const { Client, Collection } = require('discord.js');
const bot = new Client();

bot.commands = new Collection();

    // reacts to users message with whatup in emojis //
module.exports = {
    name: 'hello',
    description: 'gets a what up from ya boi',
    async execute(message) {  // needs to be an async function //
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