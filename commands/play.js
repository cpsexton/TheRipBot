const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const queue = new Map();

const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'joins users voicechannel and plays sound from youtube link',
    async execute(message, serverQueue) {
        let args = message.content.split(' ');
        const voiceChannel = message.member.voice.channel;
        
        if (!voiceChannel) {
            console.log(`${message.author.guild}`);
            message.channel.send('You need to be in a voice channel to play music!');
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('I need the permissions to join and speak in your voice channel!');
        }
        
        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url,
        };
        
        if (!serverQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };
            
            queue.set(message.guild.id, queueContruct);
            queueContruct.songs.push(song);
            
            try {
                let connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message.guild, queueContruct.songs[0]);
            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
    }
};

function newFunction(message) {
    return message.client.user;
}
