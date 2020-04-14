const { Client, Collection, MessageEmbed } = require('discord.js');
const bot = new Client();
bot.commands = new Collection();

module.exports = {
    name: "mute",
    description: "takes in a username and mutes them for a certain time. ADMIN ONLY ",
    async execute(message, args) {
        let taggedUser = message.mentions.members.first();
        let timeoutFromCommand = parseInt(args[1]);
        const embed = new MessageEmbed();
        
        await message.delete({
            timeout: 1000
        });
        
        if (!taggedUser) {
            return message.reply(`that user cannot be found.\n    *(ex: $mute @TheRipBot 5)*`)
        };   
        if (!timeoutFromCommand || timeoutFromCommand < 1 || timeoutFromCommand > 10) { 
            return message.reply("Please provide a time. Max 10 minutes.") 
        };
        
        const theGuild = message.guild;
        let timeoutAmount = (timeoutFromCommand || 0) * 60000; // converts amount to minutes
        let theMuteRole = theGuild.roles.cache.filter(role => role.name == 'muted'); // returns a collection
        
        let guildHasRole = message.guild.roles.cache.find(role => role.name == 'muted'); // truthy
        let userHasRole = taggedUser.roles.cache.find(role => role.name == 'muted'); // truthy
        
        function addRoleToUser() { // must also set timeout and remove role
            taggedUser.roles.add(theMuteRole);
            console.log(`User ${taggedUser.displayName} has been muted by ${message.author.username} for ${timeoutFromCommand} minutes`);
            message.channel.send(embed
                .setColor('ORANGE')
                .addField('Mute Successful',`${taggedUser} has been muted for ${timeoutFromCommand} minutes by ${message.author.username}`)
            );

            message.client.setTimeout(() =>  taggedUser.roles.remove(theMuteRole)
            .then(console.log(`${taggedUser.displayName} is no longer muted. They were muted for ${timeoutFromCommand} minutes by ${message.author.username}`)), timeoutAmount);  
        };
        
        
        function createMutedRole() {
            let theMuteRole = theGuild.roles.create({
                data: {
                    name: 'muted',
                    permissions: 66560
                }
            });
            return theMuteRole;
        };
        
        if (userHasRole) {  // is the user already muted?
            return message.reply(`${taggedUser} is already muted`); // YES so tell chat   
        };
        if (!guildHasRole) { // does the guild have the role                 
            const role = await createMutedRole(); // create the role
            
            await addRoleToUser(role);
            
        } else {
            return addRoleToUser();
        }
    }
}

//async

// const ready = {
    // if (!userHasRole) && (guildHasRole){

    

    //then: function(resolve, _reject) {
        // resolve('resolved')
    // }
// }