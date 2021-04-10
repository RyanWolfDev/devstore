// Requirements 
const chalk = require("chalk")
const fs = require('fs');
const dateformat = require('dateformat');
const express = require('express')
var bodyParser = require('body-parser')
json = require('json-update');
const jsonfile = require('jsonfile')
const file = './cfg/config.json'
const filep = './cfg/plugins.json'
var favicon = require('serve-favicon')
const request = require('request');

// Express Load
const app = express()
const port = 3000

module.exports = (client) => {
  app.set('view engine', 'ejs');
  app.use(favicon("./views/ico.png")); 
  app.use(express.static('./public'));

  var urlencodedParser = bodyParser.urlencoded({ extended: false })

  // Dashboard Page
  app.get('/', function(req, res) {
      try{
        request('https://lachlan-dev.com/version/dbd.txt', function (error, response, body) {
            jsonprased = JSON.parse(body)
        });
      }catch{
        console.log("Update Check Failed.")
      }
      if(jsonprased.ver == "1.1"){
        var update = "none";
      }
      else{
        var update = "show";
      }
    var info = [
        { name: 'Nome da aplicação:', desc: `${client.user.username}`},
        { name: 'Servidores em que ela está:', desc: `${client.guilds.cache.size}`},
        { name: 'Data de criação:', desc: dateformat(`${client.user.createdAt}`, 'dddd, mmmm dS, yyyy, h:MM TT')}
    ];
    var username = client.user.username;
    var av = client.user.avatarURL();
    var pagetitle = "Dashboard"
    res.render('pages/index', {
        info: info,
        username: username,
        av: av,
        update: update,
        pagetitle: pagetitle
    });
});

// Plugins Page
app.get('/plugins', function(req, res) {
    var pagetitle = "Plugins"
    var username = client.user.username;
    var config = jsonfile.readFileSync(file);
    var plugins = jsonfile.readFileSync(filep);

    res.render('pages/plugins', {
        username: username,
        plugins: plugins,
        config: config,
        pagetitle: pagetitle
    });
});

// Plugins Post Event
app.post('/plugins', urlencodedParser,function(req, res) {
    var username = client.user.username;
    var pagetitle = "Comandos"
    json.update('./cfg/plugins.json',{ban:`${req.body.ban}`,kick:`${req.body.kick}`,clear:`${req.body.clear}`,userinfo:`${req.body.userinfo}`,info:`${req.body.serverinfo}`,stats:`${req.body.stats}`,help:`${req.body.help}`,coin:`${req.body.coin}`,dog:`${req.body.dog}`,cat:`${req.body.cat}`,ball:`${req.body.ball}`,roll:`${req.body.roll}`})
    .then(function(dat) { 
    var config = jsonfile.readFileSync(file);
    var plugins = jsonfile.readFileSync(filep);
     res.render('pages/plugins', {
        username: username,
        plugins: plugins,
        config: config,
        pagetitle: pagetitle
     }); 
   });
});

// Support Page
app.get('/support', function(req, res) {
    var pagetitle = "Support"
    res.render('pages/support', {
      pagetitle: pagetitle
    });
});

// Settings Page
app.get('/settings', function(req, res) {
  var pagetitle = "Settings"
    var prefix = jsonfile.readFileSync(file).prefix
    res.render('pages/settings',
    {
        prefix: prefix,
        pagetitle: pagetitle
    });
});

// Settings Post Event
app.post('/settings', urlencodedParser,function(req, res) {
    var pagetitle = "Settings"
    json.update('./cfg/config.json',{prefix:`${req.body.prefix}`})
    .then(function(dat) { 
      var prefix = jsonfile.readFileSync(file).prefix;
      res.render('pages/settings', {
          prefix: prefix,
          pagetitle: pagetitle
      }); 
    });
});

// Dashboard running 
    app.listen(port, () => {
        console.log(chalk.green(`Dashboard running at http://localhost:${port}`))
    })
}