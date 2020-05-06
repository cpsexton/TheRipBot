const { Client, Collection } = require('discord.js');
const bot = new Client();

bot.commands = new Collection();

module.exports = {
    name: 'hello',
    description: 'gets a what up from ya boi',
    async execute(message) {
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