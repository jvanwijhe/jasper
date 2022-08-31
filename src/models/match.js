const mongoose = require('mongoose')

const Match = mongoose.model('Match', {
  date: {
    type: Date,
    required: true
  },
  team1: {
    type: [String],
    required: true
  },
  team2: {
    type: [String],
    required: true
  },
  scores: [[Number]]
})

module.exports = Match
