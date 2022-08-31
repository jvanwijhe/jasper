require('dotenv').config()
const path = require('path')
const express = require('express');
require('./db/mongoose')
const Match = require('./models/match')
const { Telegraf } = require('telegraf');
const hbs = require('hbs')

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Jasper',
    name: 'Jelle van Wijhe'
  })
})

app.post('/matches', (req, res) => {

  const data = {
    date: req.body.date,
    team1: req.body.teams.team1,
    team2: req.body.teams.team2,
    scores: req.body.score
  }

  const match = new Match(data)

  match.save().then(() => {
    res.status(201).send(match)
  }).catch((e) => {
    res.status(400).send(e)
  }) 
})
// method for invoking command start

bot.command('start', ctx => {
  console.log('By god apu it worked.')
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'whatnow?', {
  })
})

// MIDDLEWARE
//const teamDigester = async function (teams) => {
//  teams = ctx.message.text  

bot.command('help', ctx => {
  console.log('oh no you dont')
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Score formating\n---------------\n\n[Team1 : Team2] List playernames separated by commas for players, colon for teams\n[Set Scores] on new line list set scores with team1 scores first, separated by commas\n\nExample\n\nPlayer0, Player2 : Player3, Player4\nx-x,x-x,x-x', {
  })
})

bot.hears('teams', ctx => {
  console.log('thats a paddlin')
  console.log(ctx.message.text)
  Match.find({ }).then((matches) => {
    console.log('the last match was ' + matches[0].team1[0] + '/' + matches[0].team1[1] + ' vs. ' + matches[0].team2[0] + '/' + matches[0].team2[1])
    console.log('before that ' + matches[1].team1[0] + '/' + matches[1].team1[1] + ' vs. ' + matches[1].team2[0] + '/' + matches[1].team2[1])
  }) 
  bot.telegram.sendMessage(ctx.chat.id, 'Tell me the teams and scores', {
  })
})

bot.launch();

app.listen(3000, () => {
  console.log('jasper up and paddlin')
})
