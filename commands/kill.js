const { Client, Collection, Channel } = require('discord.js');
const client = new Client();
client.commands = new Collection();

module.exports = {
    name: 'kill',
    description: 'puts bot offline and logs to console who issued the command. Admin only',
    execute(message){
        console.log(`TheRipBot has been terminated by ${message.author.username}`)
        process.exit();
    }
}