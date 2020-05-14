const { Client, Collection, MessageEmbed } = require("discord.js");
const bot = new Client();
bot.commands = new Collection();
const fetch = require("node-fetch");

module.exports = {
	name: "covid",
	description: "current covid 19 information",

	async execute(message, args) {
		const embed = new MessageEmbed();
		//fetch calls
		const theReport = await fetch("https://covid19-server.chrismichael.now.sh/api/v1/AllReports").then((res) => res.json());
		const theUsReport = await fetch("https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/us/").then((res) => res.json());
		const usStatesReport = await fetch("https://covid19-server.chrismichael.now.sh/api/v1/CasesInAllUSStates/").then((res) => res.json());
		//world
		const totalDeaths = theReport.reports[0].table[0][0].TotalDeaths;
		const totalConfirmedCases = theReport.reports[0].table[0][0].TotalCases;
		const totalRecovered = theReport.reports[0].table[0][0].TotalRecovered;
		const activeCases = theReport.reports[0].table[0][0].ActiveCases;
		const severeCases = theReport.reports[0].table[0][0].Serious_Critical;
		//usa
		const totalUsCases = theUsReport.report.cases;
		const totalUsDeaths = theUsReport.report.deaths;
		const totalUsRecovered = theUsReport.report.recovered;
		const top5Countries = theReport.reports[0].table[0].slice(1, 6);
		const top5States = usStatesReport.data[0].table.slice(1, 6);

		//top 5 countries
		if (args[0] == "top5") {
			return message.channel.send(
				embed
					.setTitle("Top 5 Affected Countries")
					.setColor("RED")
					.setThumbnail(
						"https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg"
					)
					.addFields(
						{
							name: `${top5Countries[0].Country}`,
							value: `${top5Countries[0].TotalCases} cases\n${top5Countries[0].TotalDeaths} deaths`,
						},
						{
							name: `${top5Countries[1].Country}`,
							value: `${top5Countries[1].TotalCases} cases\n${top5Countries[1].TotalDeaths} deaths`,
						},
						{
							name: `${top5Countries[2].Country}`,
							value: `${top5Countries[2].TotalCases} cases\n${top5Countries[2].TotalDeaths} deaths`,
						},
						{
							name: `${top5Countries[3].Country}`,
							value: `${top5Countries[3].TotalCases} cases\n${top5Countries[3].TotalDeaths} deaths`,
						},
						{
							name: `${top5Countries[4].Country}`,
							value: `${top5Countries[4].TotalCases} cases\n${top5Countries[4].TotalDeaths} deaths`,
						}
					)
			);
		}
		//top 5 states
		if (args[0] == "top5us") {
			return message.channel.send(
				embed
					.setTitle("Top 5 Affected States - :flag_us:")
					.setColor("RED")
					.setThumbnail(
						"https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg"
					)
					.addFields(
						{
							name: `${top5States[0].USAState}`,
							value: `${top5States[0].TotalCases} cases\n${top5States[0].TotalDeaths} deaths`,
						},
						{
							name: `${top5States[1].USAState}`,
							value: `${top5States[1].TotalCases} cases\n${top5States[1].TotalDeaths} deaths`,
						},
						{
							name: `${top5States[2].USAState}`,
							value: `${top5States[2].TotalCases} cases\n${top5States[2].TotalDeaths} deaths`,
						},
						{
							name: `${top5States[3].USAState}`,
							value: `${top5States[3].TotalCases} cases\n${top5States[3].TotalDeaths} deaths`,
						},
						{
							name: `${top5States[4].USAState}`,
							value: `${top5States[4].TotalCases} cases\n${top5States[4].TotalDeaths} deaths`,
						}
					)
			);
		}
		//main covid response
		await message.channel.send(
			embed
				.setTitle("Latest on Covid-19")
				.setColor("RED")
				.setThumbnail(
					"https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg"
				)
				.addFields(
					{ name: "**Total Confirmed Cases**", value: totalConfirmedCases },
					{ name: "**Total Deaths**", value: totalDeaths },
					{ name: "**Total Recovered**", value: totalRecovered },
					{ name: "**Active Cases**", value: activeCases },
					{ name: "**Severe/Critical Cases**", value: severeCases },
					{ name: ":flag_us: :flag_us: :flag_us:", value: "**-USA-**" },
					{ name: "**Cases**", value: totalUsCases, inline: true },
					{ name: "**Deaths**", value: totalUsDeaths, inline: true },
					{ name: "**Recovered**", value: totalUsRecovered, inline: true },
					{ name: "*for further details use:*", value: "*$covid top5,   $covid top5us*", }
				)
				.setFooter("sources: CDC, WHO")
		)
	}
};
