const discord = require ("discord.js")
const dateformat = require('dateformat')
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const chalk = require("chalk")

exports.run = (client, message, args) =>{
    if(jsonfile.readFileSync(file).info == "true"){
        const info = new discord.MessageEmbed()
        .setColor('#b434eb')
        .setThumbnail(message.guild.iconURL())
        .setTitle(`Server Info`)
        .addField("Nome do servidor", `${message.guild.name}`)
        .addField("Dono(a) do servidor", `${message.guild.owner}`)
        .addField("Membros do servidor", `${message.guild.memberCount}`)
        .addField("Região do servidor", `${message.guild.region}`)
        .addField("Data de criação", dateformat(`${message.guild.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'))
        .setFooter("Ryan Marcos (C) Direitos reservados")
        message.channel.send({embed: info })
    }
    else
    {
        console.log(chalk.red("Plugin desativado no meh painel."))
    }
};