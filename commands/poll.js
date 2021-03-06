const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "poll",
    description: "creates a poll embed with positive and negative reactions",
    async execute(message, args) {

        if (!args[0]) {
            console.log('User: ' + `${message.author.username}` + ' attempted to start a poll but failed because no question was entered. ');
            message.reply(` what is your poll question?`);
            return;
        };

        const embed = new MessageEmbed();
        let reactChoice = args.pop();
        if (!reactChoice.startsWith('set')) {
            return reactionList();
        }

        function reactionList() {
            return message.reply(embed
                .setAuthor(`customize your poll with a reaction combination`)
                .setColor('ORANGE')
                .setFooter('to see this list again use $reactions')
                .setDescription(' ex: $poll question set4')
                .addFields({
                    name: 'set0',
                    value: '`👱` - `👩‍🦰`',
                    inline: true
                }, {
                    name: 'set1',
                    value: '`▶️` - `⏹`',
                    inline: true
                }, {
                    name: 'set2',
                    value: '`✅` - `⛔`',
                    inline: true
                }, {
                    name: 'set3',
                    value: '`😊` - `☹️`',
                    inline: true
                }, {
                    name: 'set4',
                    value: '`🏃‍♂️` - `👨‍🦽`',
                    inline: true
                }, {
                    name: 'set5',
                    value: '`🅰` - `🅱`',
                    inline: true
                }, {
                    name: 'set6',
                    value: '`🟢` - `🔴`',
                    inline: true
                }, {
                    name: 'set7',
                    value: '`🔈` - `🔊`',
                    inline: true
                }, {
                    name: 'set8',
                    value: '`🏳️` - `🏴`',
                    inline: true
                }, {
                    name: 'set9',
                    value: '`👍` - `👎`',
                    inline: true
                }, {
                    name: 'set10',
                    value: '`🧁` - `🧂`',
                    inline: true
                }, {
                    name: 'set11',
                    value: '`🍆` - `🍑`',
                    inline: true
                })
            )
        };

        let reactSet = [];
        if (reactChoice == 'set0') { reactSet = [`👱`, `👩‍🦰`] };
        if (reactChoice == 'set1') { reactSet = [`▶️`, `⏹`] };
        if (reactChoice == 'set2') { reactSet = [`✅`, `⛔`] };
        if (reactChoice == 'set3') { reactSet = [`😊`, `☹️`] };
        if (reactChoice == 'set5') { reactSet = [`🅰`, `🅱`] };
        if (reactChoice == 'set6') { reactSet = [`🟢`, `🔴`] };
        if (reactChoice == 'set7') { reactSet = [`🔈`, `🔊`] };
        if (reactChoice == 'set8') { reactSet = [`🏳️`, `🏴`] };
        if (reactChoice == 'set9') { reactSet = [`👍`, `👎`] };
        if (reactChoice == 'set10') { reactSet = [`🧁`, `🧂`] };
        if (reactChoice == 'set11') { reactSet = [`🍆`, `🍑`] };

        const pollQuestion = args.slice(0).join(' ');
        const msg = await message.channel.send(embed
            .setAuthor(`Poll created by ${message.author.username}`, message.guild.iconURL)
            .setColor('YELLOW')
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
        const embed = new MessageEmbed();
        return message.channel.send(
            embed
                .setAuthor(`customize your poll with a reaction combination`)
                .setColor('ORANGE')
                .setFooter('to see this list again use $reactions')
                .setDescription('ex: $poll question set4')
                .addFields({
                    name: '-  set0  -',
                    value: '`👱` - `👩‍🦰`',
                    inline: true
                }, {
                    name: '-  set1  -',
                    value: '`▶️` - `⏹`',
                    inline: true
                }, {
                    name: '-  set2  -',
                    value: '`✅` - `⛔`',
                    inline: true
                }, {
                    name: '-  set3  -',
                    value: '`😊` - `☹️`',
                    inline: true
                }, {
                    name: '-  set4  -',
                    value: '`🏃‍♂️` - `👨‍🦽`',
                    inline: true
                }, {
                    name: '-  set5  -',
                    value: '`🅰` - `🅱`',
                    inline: true
                }, {
                    name: '-  set6  -',
                    value: '`🟢` - `🔴`',
                    inline: true
                }, {
                    name: '-  set7  -',
                    value: '`🔈` - `🔊`',
                    inline: true
                }, {
                    name: '-  set8  -',
                    value: '`🏳️` - `🏴`',
                    inline: true
                }, {
                    name: '-  set9  -',
                    value: '`👍` - `👎`',
                    inline: true
                }, {
                    name: '-  set10  -',
                    value: '`🧁` - `🧂`',
                    inline: true
                }, {
                    name: '-  set11  -',
                    value: '`🍆` - `🍑`',
                    inline: true
                })
        )
    }
}
