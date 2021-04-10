const discord = require ("discord.js")
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const chalk = require('chalk');

exports.run = (client, message, args) =>{
    if(jsonfile.readFileSync(file).clear == "true"){
    const {member, mentions } = message
    const tag = `<@${member.id}>`
    if(message.guild.me.hasPermission('MANAGE_MESSAGES')){
        if(member.hasPermission("MANAGE_MESSAGES")){
            let deleteAmount;
    
            if(isNaN(args[0]) || parseInt(args[0]) <= 0) {return message.reply('Especifique uma quantidade de mensagens!')}
            if(parseInt(args[0]) > 100){
                message.reply('Você só pode deletar 100 mensagens por vez!')
            }else{
                deleteAmount = parseInt(args[0])
                message.channel.bulkDelete(deleteAmount,true)
                message.reply(`**Foram deletadas** ***${deleteAmount}*** **mensagens com sucesso!**`)
            }
        }else{
            message.channel.send(`${tag} Você não tem permissão para isso.`)
        }
    }else{
        message.channel.send(`${tag} Desculpe! Eu não tenho permissão para gerenciar mensagens!`)
    }
}else
{
    console.log(chalk.red("O plugin de clear não está ativo no meu painel."))
}
}