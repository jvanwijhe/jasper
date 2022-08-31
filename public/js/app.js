console.log('Client side javascript file is jasperloaded!')


const matchForm = document.querySelector('form')
const date = document.querySelector('input[type="date"]')
const players = document.querySelectorAll('input[type="checkbox"]')
const set1 = document.querySelectorAll('#set1')
const set2 = document.querySelectorAll('#set2')
const set3 = document.querySelectorAll('#set3')

const setScores =  [ set1, set2, set3 ]

matchForm.addEventListener('submit', (e) => {
  e.preventDefault()

  
  const team1 = []
  const team2 = []
  let matchScore = []

  const teamSplit = players.forEach((player) => {
    if (player.checked) {
      team1.push(player.id)
    } else {
      team2.push(player.id)
    } 
  })

  //TODO figure out a way to increment the set key +1 in the matchScore object

  const scoring = setScores.forEach((setScore) => {
    const scores = []
    setScore.forEach((set) => {
      scores.push(set.valueAsNumber)
    }) 
      matchScore.push(scores)
  }) 

  const teams = { team1: team1, team2: team2}
  const match = {
    date: date.value,
    teams,
    score: matchScore
  }
  console.log(date.value)

  console.log(JSON.stringify(match))

  fetch('http://localhost:3000/matches', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(match)
    }).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log('error', data.error)
      } else {
        console.log('response', data)
      }
    })
  })
  
})
