const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

    // reacts to users message with whatup in emojis //
module.exports = {
    name: 'hi',
    description: 'gets a cooler what up from ya boi',
    async execute(message) {
        try {
            await message.react('🇼');
            await message.react('🇭');
            await message.react('🇦');
            await message.react('🇹');
            await message.react('🇺');
            await message.react('🇵');
            await message.reactions.cache.get('🇼').remove();
            await message.react('👍');
            await message.reactions.cache.get('🇭').remove();
            await message.react('🇼');
            await message.reactions.cache.get('🇦').remove();
            await message.react('🇭');
            await message.reactions.cache.get('🇹').remove();
            await message.react('🇦');
            await message.reactions.cache.get('🇺').remove();
            await message.react('🇹');
            await message.reactions.cache.get('🇵').remove();
            await message.react('🇺');
            await message.reactions.cache.get('👍').remove();
            await message.react('🇵');
        } catch (error) {
            console.error('One of the emojis failed to react.')
        }
    }
}