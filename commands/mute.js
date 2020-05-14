const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "mute",
    description: "takes in a username and mutes them for a certain time. ADMIN ONLY ",
    async execute(message, args) {
        let taggedUser = message.mentions.members.first();
        let timeoutDuration = parseInt(args[1]);
        const embed = new MessageEmbed();

        await message.delete({
            timeout: 1000
        });

        if (!taggedUser) {
            return message.reply(`that user cannot be found.\n    *(ex: $mute @TheRipBot 5)*`)
        };
        if (!timeoutDuration || timeoutDuration < 1 || timeoutDuration > 10) {
            return message.reply("Please provide a time. Max 10 minutes.")
        };

        const currentGuild = message.guild;
        let timeoutInMinutes = (timeoutDuration || 0) * 60000;
        let theMuteRole = currentGuild.roles.cache.filter(role => role.name == 'muted');

        let guildHasRole = message.guild.roles.cache.find(role => role.name == 'muted');
        let userHasRole = taggedUser.roles.cache.find(role => role.name == 'muted');

        function addRoleToUser() {
            taggedUser.roles.add(theMuteRole);
            console.log(`User ${taggedUser.displayName} has been muted by ${message.author.username} for ${timeoutDuration} minutes`);
            message.channel.send(embed
                .setColor('ORANGE')
                .addField('Mute Successful', `${taggedUser} has been muted for ${timeoutDuration} minutes by ${message.author.username}`)
            );
            message.client.setTimeout(() => taggedUser.roles.remove(theMuteRole)
                .then(console.log(`${taggedUser.displayName} is no longer muted. They were muted for ${timeoutDuration} minutes by ${message.author.username}`)), timeoutInMinutes);
        };

        function createMutedRole() {
            let theMuteRole = currentGuild.roles.create({
                data: {
                    name: 'muted',
                    permissions: 66560
                }
            });
            return theMuteRole;
        };

        if (userHasRole) {
            return message.reply(`${taggedUser} is already muted`);
        };
        if (!guildHasRole) {
            const role = await createMutedRole();
            await addRoleToUser(role);
        } else {
            return addRoleToUser();
        }
    }
}
