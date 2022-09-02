require('dotenv').config()

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const Match = require('./models/match')

bot.hears('teams', ctx => {
  console.log(ctx.from)
  console.log(ctx.message.text)
  Match.find({ }).then((matches) => {
    console.log('the last match was ' + matches[0].team1[0] + '/' + matches[0].team1[1] + ' vs. ' + matches[0].team2[0] + '/' + matches[0].team2[1])
    console.log('before that ' + matches[1].team1[0] + '/' + matches[1].team1[1] + ' vs. ' + matches[1].team2[0] + '/' + matches[1].team2[1])
  }) 
  bot.telegram.sendMessage(ctx.chat.id, 'Tell me the teams and scores', {
  })
})

bot.launch()

module.export = bot
