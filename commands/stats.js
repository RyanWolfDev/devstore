const discord = require ("discord.js");
const dateformat = require('dateformat');
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const chalk = require("chalk")
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args) =>{
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    if(jsonfile.readFileSync(file).stats == "true"){
    const info = new discord.MessageEmbed()
    .setColor('#b434eb')
    .setThumbnail(client.user.avatarURL())
    .setTitle(`${client.user.username} - Stats`)
    .addField("Nome", `${client.user.username}#${client.user.discriminator}`)
    .addField("Servidores em que eu estou", `${client.guilds.cache.size}`)
    .addField("Tempo on-line", duration)
    .addField("Tempo de resposta", `${Math.round(client.ws.ping)}ms`)
    .addField("Meu aniversário", dateformat(`${client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'))
    .setFooter("Ryan Marcos (C) Direitos reservados")
    message.channel.send({embed: info })
    }
    else
    {
        console.log(chalk.red("Este plugin não está ativo no meu painel."))
    }
}
 