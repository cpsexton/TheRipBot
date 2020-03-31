const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();


module.exports = {
    name: "poll",
    description: "created a poll embed with yes or no reaction.",

    async execute(message, args) {

        if(!args[1]) {
            console.log('User: ' + `${message.author.username}` + ' attempted to start a poll but failed because no question was entered. ');
            message.reply(` what is your poll question?`);   
            return;
        }; 

        const embed = new Discord.MessageEmbed();
        let reactChoice = args.pop();
        if(!reactChoice.startsWith('set')){
            return reactionList();
        }

        function reactionList() {
            return message.reply(embed
                .setAuthor( `customize your poll with a reaction combination` )
                .setColor( 'ORANGE' )
                .setFooter( 'to see this list again use $reactions' ) // create listener for reactions
                .setDescription( ' ex: $poll question set4' )
                .addFields({
                    name: 'set0',
                    value: '`👱` - `👩‍🦰`',
                    inline: true
                },{
                    name: 'set1',
                    value: '`▶️` - `⏹`',
                    inline: true
                },{
                    name: 'set2',
                    value: '`✅` - `⛔`',
                    inline: true
                },{
                    name: 'set3',
                    value: '`😊` - `☹️`',
                    inline: true
                },{
                    name: 'set4',
                    value: '`🏃‍♂️` - `👨‍🦽`',
                    inline: true
                },{
                    name: 'set5',
                    value: '`🅰` - `🅱`',
                    inline: true
                },{
                    name: 'set6',
                    value: '`🟢` - `🔴`',
                    inline: true
                },{
                    name: 'set7',
                    value: '`🔈` - `🔊`',
                    inline: true
                },{
                    name: 'set8',
                    value: '`🏳️` - `🏴`',
                    inline: true
                },{
                    name: 'set9',
                    value: '`👍` - `👎`',
                    inline: true
                },{
                    name: 'set10',
                    value: '`🧁` - `🧂`',
                    inline: true
                },{
                    name: 'set11',
                    value: '`🍆` - `🍑`',
                    inline: true
                })
            )
        };

        let reactSet = [];
        if (reactChoice == 'set0') { reactSet = [`👱`,`👩‍🦰`] };
        if (reactChoice == 'set1') { reactSet = [`▶️`,`⏹`] };
        if (reactChoice == 'set2') { reactSet = [`✅`,`⛔`] };
        if (reactChoice == 'set3') { reactSet = [`😊`,`☹️`] };
        if (reactChoice == 'set4') { reactSet = [`🏃‍♂️`,`👨‍🦽`] };
        if (reactChoice == 'set5') { reactSet = [`🅰`,`🅱`] };
        if (reactChoice == 'set6') { reactSet = [`🟢`,`🔴`] };
        if (reactChoice == 'set7') { reactSet = [`🔈`,`🔊`] };
        if (reactChoice == 'set8') { reactSet = [`🏳️`,`🏴`] };
        if (reactChoice == 'set9') { reactSet = [`👍`,`👎`] };
        if (reactChoice == 'set10') { reactSet = [`🧁`,`🧂`] };
        if (reactChoice == 'set11') { reactSet = [`🍆`,`🍑`] };

        const pollQuestion = args.slice(1).join(' ');
        const msg = await message.channel.send(embed
            .setAuthor(`Poll created by ${message.author.username}`, message.guild.iconURL)
            .setColor('BLUE')
            .setFooter("React to vote.")
            .setDescription(pollQuestion)
        );

        await msg.react(reactSet[0]); 
        await msg.react(reactSet[1]);  
        await message.delete({
            timeout: 1000
        });

    },

    reactionList(message) {
        const embed = new Discord.MessageEmbed();
        return message.channel.send(embed

        .setAuthor( `customize your poll with a reaction combination` )
        .setColor( 'ORANGE' )
            .setFooter( 'to see this list again use $reactions' ) // create listener for reactions
        .setDescription( 'ex: $poll question set4' )
        .addFields({
            name: '-  set0  -',
            value: '`👱` - `👩‍🦰`',
            inline: true
        },{
            name: '-  set1  -',
            value: '`▶️` - `⏹`',
            inline: true
        },{
            name: '-  set2  -',
            value: '`✅` - `⛔`',
            inline: true
        },{
            name: '-  set3  -',
            value: '`😊` - `☹️`',
            inline: true
        },{
            name: '-  set4  -',
            value: '`🏃‍♂️` - `👨‍🦽`',
            inline: true
        },{
            name: '-  set5  -',
            value: '`🅰` - `🅱`',
            inline: true
        },{
            name: '-  set6  -',
            value: '`🟢` - `🔴`',
            inline: true
        },{
            name: '-  set7  -',
            value: '`🔈` - `🔊`',
            inline: true
        },{
            name: '-  set8  -',
            value: '`🏳️` - `🏴`',
            inline: true
        },{
            name: '-  set9  -',
            value: '`👍` - `👎`',
            inline: true
        },{
            name: '-  set10  -',
            value: '`🧁` - `🧂`',
            inline: true
        },{
            name: '-  set11  -',
            value: '`🍆` - `🍑`',
            inline: true
        })
    )}   
}
