const discord = require ("discord.js")
const jsonfile = require('jsonfile')
const file = './cfg/plugins.json'
const config = require('../cfg/config.json')
const chalk = require("chalk")

exports.run = (client, message, args) =>{
    if(jsonfile.readFileSync(file).help == "true"){
        const help = new discord.MessageEmbed()
        .setColor('#b434eb')
        .setTitle(`${client.user.username} - Help`)
        .setFooter("Ryan Marcos (C) Direitos reservados")
        // Moderation Commands
        if(jsonfile.readFileSync(file).ban == "true"){
            help.addField("Ban",`Bane um usuário do servidor.\n Use: ${config.prefix}ban @usuario\n`)
        }
        if(jsonfile.readFileSync(file).kick == "true"){
            help.addField("Kick ",`Expulsa um usuário do servidor.\n Use: ${config.prefix}kick @usuario\n`)
        }
        if(jsonfile.readFileSync(file).clear == "true"){
            help.addField("Clear ",`Deleta mensagens do canal.\n Use: ${config.prefix}clear (numero)\n`)
        }
        // Utilities Commands
        if(jsonfile.readFileSync(file).userinfo == "true"){
            help.addField("User Info",`Mostra informações do usuário mencionado.\n Use: ${config.prefix}userinfo @usuario\n`)
        }
        if(jsonfile.readFileSync(file).info == "true"){
            help.addField("Server Info",`Envia informações do servidor atual.\n Use: ${config.prefix}serverinfo\n`)
        }
        if(jsonfile.readFileSync(file).stats == "true"){
            help.addField("Stats",`Estatísticas do bot.\n Use: ${config.prefix}stats\n`)
        }
        if(jsonfile.readFileSync(file).help == "true"){
            help.addField("Help",`Envia minha lista de comandos.\n Use: ${config.prefix}help\n`)
        }
        // Fun Commands
        if(jsonfile.readFileSync(file).coin == "true"){
            help.addField("Cara ou Coroa", `Cara ou Coroa padrão.\n Use: ${config.prefix}coin\n`)
        }
        if(jsonfile.readFileSync(file).dog == "true"){
            help.addField("Dog",`Envia uma foto aleatória de um cachorro.\n Use: ${config.prefix}dog\n`)
        }
        if(jsonfile.readFileSync(file).cat == "true"){
            help.addField("Cat",`Envia uma foto aleatória de um gato.\n Use: ${config.prefix}cat\n`)
        }
        if(jsonfile.readFileSync(file).ball == "true"){
            help.addField("Vidente",`Faça uma pergunta ao vidente.\n Use: ${config.prefix}vidente (pergunta)\n`)
        }
        if(jsonfile.readFileSync(file).roll == "true"){
            help.addField("Roll",`Roleta de números.\n Use: ${config.prefix}roll\n`)
        }



        message.channel.send({embed: help })
    }
    else
    {
        console.log(chalk.red("Este plugin não está ativo no meu painel."))
    }
}