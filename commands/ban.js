const discord = require ("discord.js");
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const chalk = require('chalk');

exports.run = (client, message, args) =>{
    if(jsonfile.readFileSync(file).ban == "true"){
        const {member, mentions } = message

        const tag = `<@${member.id}>`
        if(message.guild.me.hasPermission('BAN_MEMBERS')){        
            if(
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')){
                const target = mentions.users.first()
                if(target){
                    const targetMember = message.guild.members.cache.get(target.id)
                    targetMember.ban()
                    const kick = new discord.MessageEmbed()
                    .setColor('#b434eb')
                    .setTitle(`Usuário banido`)
                    .addField("Usuario",`${target} foi banido do servidor.`)
                    .addField("Staffer",`${member}`)
                    .setThumbnail(target.avatarURL())
                    .setFooter("Ryan Marcos (C) Diretos reservados")
                    message.channel.send({embed: kick })
                }else{
                    message.channel.send(`${tag} Especifique um usuário!`)
                }
            }else{
                message.channel.send(`${tag} Você não tem permissão.`)
            }
        }else{
            message.channel.send(`${tag} desculpe, eu não permissão para banir membros!`)
        }
    }
    else
    {
        console.log(chalk.red("O plugin de banimento não foi ativado no meu painel."))
    }
}