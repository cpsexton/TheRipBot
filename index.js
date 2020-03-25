const Discord = require('discord.js');
const fs = require('fs');
const {prefix, token} = require('./config.json');
const ytdl = require('ytdl-core');


const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const queue = new Map();

	// (default = 10) // 
require('events').EventEmitter.defaultMaxListeners = 20

	// will require the command file needed to execute the function making request //
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

	// logs to console that bot has successfully launched and sets bots activity to 'Watching the chat' //
client.on('ready', () => {
	console.log('TheRipBot has launched successfully!');
	client.user.setActivity("chat. $help", {type: "WATCHING"});
});

function calculateTime(){
	let time = { hours: 0, minutes: 0, seconds: 0}
	time.seconds = Math.trunc(client.uptime / 1000)
	time.minutes = Math.trunc(client.uptime / 60000)
	time.hours = Math.trunc(client.uptime / 3600000)
	return time
};

client.on('message', async message => {
	let args = message.content.slice(prefix.length).split(' ');
	const serverQueue = queue.get(message.guild.id);
	
	const adminRole = message.member.roles.cache.some(r => r.permissions.has('ADMINISTRATOR'));
	const commandExe = () => client.commands.get(args[0].toLowerCase()).execute(message);
	const commandExeArgs = () => client.commands.get(args[0].toLowerCase()).execute(message, args);
	const commandExeSong = () => client.commands.get(args[0].toLowerCase()).execute(message, serverQueue);
	const commandExeAdmin = () =>  adminRole ? commandExeArgs() : message.channel.send('That command is for Admin use only');

	if(!message.content.startsWith(`${prefix}`)) return; // if message doesnt start with prefix return //
	switch (args[0]) {
		
		case 'hello':		// reacts to message with emojis to say whatup //
		case 'help':		// returns list of commands //
		case 'whois':		// returns detailed information about requested user //
		case 'online':  	// searches and returns users that are online and offline //
		case 'pfp':  		// returns a users profile picture //	
		case 'serverinfo':  // returns detailed information on the current server //
		commandExe(); 
		break; 
		
		
		case 'timer':		//  gets time from argument. starts a countdown. alerts users of start and finish  //
		commandExeArgs();
		break;
		
		case 'play':  		// joins users voicechannel and plays sound from youtube link //
		case 'skip':  		// skips current song //
		case 'stop':  		// stops audio from playing //
		commandExeSong();
		break;
		
		case 'ban':  		// bans user
		case 'kick': 		// kicks the specified user. ADMIN ONLY //
		case 'sLogOn': 		// logs in to Steam as anonymous Steam User. ADMIN ONLY //
		case 'sLogOff': 	// logs off Steam. ADMIN ONLY //
		case 'kill':  		// puts bot offline and logs to console who issued the command. ADMIN ONLY //
		commandExeAdmin();
		
		case 'uptime': client.commands.get('uptime').execute(message, calculateTime()); break; // returns uptime in hours, minutes, and seconds
		
		default: break;
	}
});





// below is all the music commands //
client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	const serverQueue = queue.get(message.guild.id);
	
	if (message.content.startsWith(`${prefix}skip`)) {	// skips current song and plays next in queue //
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {	// stops current song from playing //
		stop(message, serverQueue);
		return;
	} 
});

// async function execute(message, serverQueue) {
// 	let args = message.content.split(' ');
// 	const voiceChannel = message.member.voice.channel;
	
//     if (!voiceChannel) {
// 		console.log(`${message.author.guild}`);
//         message.channel.send('You need to be in a voice channel to play music!');
//     }
// 	const permissions = voiceChannel.permissionsFor(message.client.user);
// 	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
// 		return message.channel.send('I need the permissions to join and speak in your voice channel!');
// 	}
	
// 	const songInfo = await ytdl.getInfo(args[1]);
// 	const song = {
// 		title: songInfo.title,
// 		url: songInfo.video_url,
// 	};
	
// 	if (!serverQueue) {
// 		const queueContruct = {
// 			textChannel: message.channel,
// 			voiceChannel: voiceChannel,
// 			connection: null,
// 			songs: [],
// 			volume: 5,
// 			playing: true,
// 		};
		
// 		queue.set(message.guild.id, queueContruct);
// 		queueContruct.songs.push(song);
		
// 		try {
// 			let connection = await voiceChannel.join();
// 			queueContruct.connection = connection;
// 			play(message.guild, queueContruct.songs[0]);
// 		} catch (err) {
// 			console.log(err);
// 			queue.delete(message.guild.id);
// 			return message.channel.send(err);
// 		}
// 	} else {
// 		serverQueue.songs.push(song);
// 		console.log(serverQueue.songs);
// 		return message.channel.send(`${song.title} has been added to the queue!`);
// 	}
// };

function skip(message, serverQueue) {
	if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.destroy();
	message.channel.send(`Song has been skipped by ${message.author}`)
};

function stop(message, serverQueue) {
	if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.destroy();
	message.channel.send(`Playback has been stopped by ${message.author}`)
};

async function play(guild, song) {
	const serverQueue = queue.get(guild.id);
	
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.play(await ytdl(song.url))
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

// Discord Webhook Ripoff's server #General https://discordapp.com/api/webhooks/690363009356529694/t54ufhokKvJOlZoDmUM-VpxKyhRkepekWgDoCbI9YQI6skeY4Wj1lt1LJV3bnVH16qnf



//BUG in slogon.js when you log in, log off and log in again it will throw an error saying already logged on

//TODO defaultMaxListeners	eventemitter function to detect number of listeners in file and add 1 to the default max listeners value
//TODO song <url> command    (songs stop a minute or so in)
//TODO playing <game> command   (search command to find users in channel that are online && playing the searched game in their activity status)
//TODO add all commands to help list (ongoing)
//TODO kill command needs to exit voice channels before ending process

// copyright Christopher Sexton and Andrew Thiessen 2020
