const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const client = new Client();
client.commands = new Collection();
const fetch = require('node-fetch')


module.exports = {
	name: 'covid',
	description: "current covid 19 information",
	
	async execute(message) {
        //fetch calls
        const theDeaths = await fetch('https://covid19-server.chrismichael.now.sh/api/v1/Deaths').then(res => res.json());      
        const theConfirmedCases = await fetch('https://covid2019-api.herokuapp.com/v2/confirmed').then(response => response.json());
        const theUsCases = await fetch('https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/us/').then(r => r.json());
        //world
        const totalDeaths = theDeaths.deaths.deaths;
        const totalConfirmedCases = theConfirmedCases.data;
        const confCasesDate = theConfirmedCases.dt;
        //usa
        const totalUsCases = theUsCases.report.cases;
        const totalUsDeaths = theUsCases.report.deaths;

        const embed = new Discord.MessageEmbed();
        await message.channel.send(embed
            .setTitle('Latest on Covid-19')
            .setColor('YELLOW')
            .setThumbnail('https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg')
            .addField(`**Total Confirmed Cases**`, totalConfirmedCases)
            .addField(`**Total Deaths**`, totalDeaths)
            .addFields(
                { name: 'Countries', value: '**-USA-**' },
                { name: 'Total Cases', value: totalUsCases, inline: true },
                { name: 'Total Deaths', value: totalUsDeaths, inline: true },
            )
            .addField(` *last updated*`, confCasesDate)
            .setFooter('sources: CDC, WHO, Johns-Hopkins - CRC')
        )
            
        console.log(`totalDeaths : ${totalDeaths}\n totalConfirmedCases : ${totalConfirmedCases}\n confCasesDate :  ${confCasesDate}\n totalUsCases : ${totalUsCases}`);
    }
}
