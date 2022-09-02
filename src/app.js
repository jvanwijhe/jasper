require('dotenv').config()
const path = require('path')
const express = require('express');
require('./db/mongoose')
const jasper = require('./bot')
const matchRouter = require('./routers/match')
const hbs = require('hbs')

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.static(path.join(publicDirectoryPath)))

app.use(matchRouter)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Jasper',
    name: 'Jelle van Wijhe'
  })
})

app.listen(3000, () => {
  console.log('jasper up and paddlin')
})
