const express = require('express')
const router = new express.Router()
const Match = require('../models/match')

router.post('/matches', (req, res) => {

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

module.exports = router
