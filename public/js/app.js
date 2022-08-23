console.log('Client side javascript file is jasperloaded!')


const matchForm = document.querySelector('form')
const players = document.querySelectorAll('input[type="checkbox"]')
const set1 = document.querySelectorAll('#set1')
const set2 = document.querySelectorAll('#set2')
const set3 = document.querySelectorAll('#set3')

const setScores =  [ set1, set2, set3 ]
console.log(setScores)

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

  const teams = { team1: [team1], team2: [team2]}
  const match = {
    teams,
    score: matchScore
  }

  console.log(match)
  

/*
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
  */
})
