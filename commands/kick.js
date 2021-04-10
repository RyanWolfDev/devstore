const discord = require ("discord.js");
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const chalk = require('chalk');

exports.run = (client, message, args) =>{
    if(jsonfile.readFileSync(file).kick == "true"){
        const {member, mentions } = message

        const tag = `<@${member.id}>`
        if(message.guild.me.hasPermission('KICK_MEMBERS')){        
            if(
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')){
                const target = mentions.users.first()
                if(target){
                    const targetMember = message.guild.members.cache.get(target.id)
                    targetMember.kick()
                    const kick = new discord.MessageEmbed()
                    .setColor('#eb9d17')
                    .setTitle(`Usuário expulso`)
                    .addField("Usuario",`${target} foi kickado do servidor!`)
                    .addField("Staffer",`${member}`)
                    .setThumbnail(target.avatarURL())
                    .setFooter("Ryan Marcos (C) Direitos reservados")
                    message.channel.send({embed: kick })
                }else{
                    message.channel.send(`${tag} Especifique um usuário!`)
                }
            }else{
                message.channel.send(`${tag} Você não tem permissão.`)
            }
        }else{
            message.channel.send(`${tag} Não tenho permissão para expulsar membros!`)
        }
    }
    else
    {
        console.log(chalk.red("P plugin não foi ativado no meu painel."))
    }
}