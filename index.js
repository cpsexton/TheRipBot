const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

    //responds with a direct response
client.on('message', message => {
    
    if(message.content === `${prefix}fart`) {
        message.channel.send("*toot*");
    } else if(message.content === `${prefix}Yardmeat`) {
        message.channel.send("That's ADHD Andrew")
    } else if(message.content === `${prefix}Rage Gage`) {
        message.channel.send("That's Gregarious Gage")
    } else if(message.content === `${prefix}Ripoff`) {
        message.channel.send("That's Coronavirus Chris")
    } else if(message.content === `${prefix}TickTickBoom`) {
        message.channel.send("That's Magical Muhammad")
    } else if(message.content === `${prefix}Yung Daemon`) {
        message.channel.send("That's Dick Diddling Damon")
    }

});

    //responds with an embeded help message consisting of list of commands
client.on('message', message => {
    
    if(message.content === `${prefix}help`) {
        message.channel.send({embed: {
            color: 255,
            description: ("TheRipBot\n\n  Commands:\n  **$help**: List of commands\n\n  **$whois <username>**: Will respond with requested users information\n\n  **$server**: Will respond with the server details\n\n  **$hello**: Get a what up from ya boi\n\n  **$fart**: Will release a deadly disgusting coronavirus fart in the channel")
        }})
    }

});
        //NEEDS TO BE FINISHED
    //responds with requested discord users information
client.on('message', message => {
    
    if(message.content === `${prefix}whois`) {
        message.channel.send({embed: { 
            color: 16711680,
            description: (`Your game: ${message.author.presence.activities}\n  id: ${message.author.id}\n   name: ${message.author.username}\n  status: ${message.author.presence.status}`)
        }})
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

client.on('message', message => {

    if(message.author.id === '322974067781271572' && message.content === `${prefix}reset`) {
        console.log('Bot has been terminated'),
        process.exit()
    }
})
//from the channel the message was heard:
    //fetch online users presence activites and store in array 
        //if user input is equal to any activity in the array return that username in an embed li 
    
    //if(message.author.presence.activities = )



    //ability to change the bots status to Watching or Listening to
// client.on('message', message => {

//     if(message.content == `${prefix}watching`) {
//         client.user.setActivity()
//     }

// })


//this should access the game in the activity || game name from a person actually playing a game if not catch the error. 
// console.log(`${presence.game.name}`)

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




// if (message.content.startsWith(`${prefix}ping`)) {
// 	message.channel.send('Pong.');
// } else if (message.content.startsWith(`${prefix}beep`)) {
// 	message.channel.send('Boop.');
// }


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
    //whois command   ($whois ripoff - should return information on ripoff. use .split .first etc to seperate the command from the user requested)
    //song command    (joins a voice channel then plays a youtube song from a link then after a timeout will leave voice channel)
    //playing command (search command to find users in channel that are online && playing the searched game in their activity status)
    //whenever booboo keys talks in channel add emoji tiny p 


    //  LINKS

    //https://emojipedia.org/emoji-2.0/    discord emoji list