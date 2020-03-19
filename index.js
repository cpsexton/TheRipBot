const Discord = require('discord.js');
const fs = require('fs');
const {prefix, token} = require('./config.json');
// const ytdl = require('ytdl-core');
const ytdl = require('ytdl-core-discord');
const ffmpeg = require('ffmpeg');

const client = new Discord.Client();
const embed = new Discord.MessageEmbed();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const queue = new Map();

// will require the command file needed to execute the function making request //
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// logs to console that bot has successfully launched and sets bots activity to 'Watching chat' //
client.on('ready', () => {
	console.log('Ready!');
    client.user.setActivity("chat.", {type: "WATCHING"});
});

// command UPTIME. returns number of milliseconds 
client.on('message', message => {

	if(message.content.startsWith(`${prefix}uptime`)) {
		message.channel.send(embed
            .setTitle('Uptime')
            .setDescription(`${client.uptime} milliseconds`)
			)
		};

});
					
	// command KILL. puts bot offline and logs to console who issued the command //
client.on('message', message => {
								
	if(message.author.id === '322974067781271572' && message.content === `${prefix}kill`) {
		console.log(`TheRipBot has been terminated by ${message.author.username}`),						
		process.exit()
	};
								
});
							
	// command HELLO. reacts to message with emojis to say whatup //
client.on('message', async message => {
								
	if(message.content == `${prefix}hello`) {
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
    };
    
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);
	// let args = message.content.slice(prefix.length).split(' ');
	const args = message.content.split(' ');

	if (message.content.startsWith(`${prefix}play`)) {	// command PLAY. joins users voicechannel and plays sound from youtube link //
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {	// command SKIP. skips current song and plays next in queue //
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {	// command STOP. stops current song from playing //
		stop(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}online`)) {	  // command ONLINE. searches and returns online members //
		client.commands.get('online').execute(message);
		return;
	} else if (message.content.startsWith(`${prefix}server`)) {    // command SERVER. returns information on the current server //
        client.commands.get('server').execute(message, args);
		return;
	} else if (message.content.startsWith(`${prefix}whois`)) {    // command WHOIS <username>. returns detailed information about requested user //
		client.commands.get('whois').execute(message, args);
		return;
	} else if (message.content.startsWith(`${prefix}help`)) {    // command HELP. returns list of commands // takes in arguments but does not currently use them // future goal is add help <topic> func //
		client.commands.get('help').execute(message, args);
		return;
	} 

});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');
	const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        console.log(`${message.author.guild}`);
        message.channel.send('You need to be in a voice channel to play music!');
    };
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

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

async function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.play(await ytdl(song.url), { type: 'opus' })
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
};

// token is hidden //
client.login(token);


///////////////////////////////////////////////////////////////////////////////////////////

//TODO 
    //BUG duplication. commands such as $server will continuously duplicate embed fields creating a long repeating embed
	
	//song <url> command    (songs stop a minute or so in)
    //playing <game> command   (search command to find users in channel that are online && playing the searched game in their activity status)
    //add server join link in server information to $server command
	//add more commands to help list
	
