const discord = require ("discord.js");
const dateformat = require('dateformat');
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const chalk = require("chalk")

exports.run = (client, message, args) =>{
    if(jsonfile.readFileSync(file).userinfo == "true"){
    const member = message.mentions.members.last() || message.guild.members.cache.get(args) || message.member;
    const info = new discord.MessageEmbed()
    .setColor('#b434eb')
    .setThumbnail(member.user.avatarURL())
    .setTitle(`UserInfo`)
    .addField("Nome de usuário", `${member.user.username}#${member.user.discriminator}`)
    .addField("Data de criação da conta", dateformat(`${member.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT'))
    .setFooter("Ryan Marcos (C) Direitos reservados")
    message.channel.send({embed: info })
    }
    else
    {
        console.log(chalk.red("Plugin não está ativo no meu painel."))
    }
}
 