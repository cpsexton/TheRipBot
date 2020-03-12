const Discord = require('discord.js');
const fs = require('fs');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();
const embed = new Discord.MessageEmbed();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity("chat.", {type: "WATCHING"})
});

//responds with an embeded help message consisting of commands list
client.on('message', message => {
    
    if(message.content === `${prefix}help`) {
        message.channel.send({embed: {
            color: 255,
            description: ("TheRipBot\n\n  Commands:\n  **$help**: List of commands\n\n  **$whois <username>**: Will respond with requested users information\n\n  **$server**: Will respond with the server details\n\n  **$hello**: Get a what up from ya boi")
        }})
    }

});

    // command whois <username>. returns from whois.js file
client.on('message', message => {
            
    let args = message.content.slice(prefix.length).split(' ');
    
    if(message.content.startsWith(`${prefix}whois`)) {
        client.commands.get('whois').execute(message, args);     
    }
});

//responds with embedded information on the server
client.on('message', message => {
    
    if(message.content == `${prefix}server`) {
        message.channel.send({embed: {
            color: 65280,
            description: (`Server Information:\n\nServer name: ${message.guild.name}\nOwner: ${message.guild.owner}\nTotal members: ${message.guild.memberCount}\nMaximum Members: ${message.guild.maximumMembers}\nRegion: ${message.guild.region}`)
        }})

}});

    //puts bot offline and logs to console who issued the command
client.on('message', message => {
    if(message.author.id === '322974067781271572' && message.content === `${prefix}kill`) {
        console.log(`TheRipBot has been terminated by ${message.author.username}`),
        process.exit()
    }
});

//from the channel the message was heard:
    //fetch online users presence activites and store in an object 
        //if user input is equal to any activity in the array return that username in an embed li 

//adds letter emojis to say whatup
client.on('message', async message => {
    // if(message.author.id == '322974067781271572') {
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
    }
});

    //token is located in config.json to hide from public view
client.login(token);




//can define colors here for Embed class
    //const yellow = 16776960
    //const red = 16711680
    //const blue = 255
    //const green = 65280

//searches and returns online members
    // First we use guild.members.fetch to make sure all members are cached
    //<message>.guild.members.fetch().then(fetchedMembers => {
	//const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
	// We now have a collection with all online member objects in the totalOnline variable
	//<message>.channel.send(`There are currently ${totalOnline.size} members online in this guild!`);
    //});

//TODO 
    //whois <username> command   (bug that duplicates code in responce when asked multiple times. switch case ?)
    //song <url> command    (joins a voice channel then plays a youtube song from a link then after a timeout will leave voice channel)
    //playing <game> command   (search command to find users in channel that are online && playing the searched game in their activity status)
    //add server join link in server information to $server command
