// worked with gardner gang

let botScore = 0
let playerScore = 0

document.querySelectorAll('.player-choice').forEach(choice => {
  choice.addEventListener('click', playGame)
})

function clearChosen() {
  document.querySelectorAll('.player-choice').forEach(choice => {
    choice.classList.remove(`chosen`)
  })
}

function playGame(event) {
  const clickedElement = event.target.closest(`button`);
  let playerChoice = clickedElement.id

  clearChosen()
  clickedElement.classList.add(`chosen`)

  // `/choose?choice=${playerChoice}`
  // `choice = "${playerChoice}"`
  // `{ choice: "scissors" }` // or rock you know could be anything
  fetch(`/choose?choice=${playerChoice}`).then(response => response.json()).then((response) => {
    document.querySelector(`#result`).innerText = response.result // either "tie", "win", or "lose"
    document.querySelector(`#player-hand`).innerText = playerChoice
    document.querySelector(`#bot-hand`).innerText = response.botChoice
  })
}

// THE ENTIRE SYSTEM: (from start all the way to end)
// server
//     o 1) provide the HTML/css/client side js

//     o 5) decide the bot's hand
//     o 6) determine victory, sends to client

// client
//     html/css
//         o 2) present stuff!

//     javascript
//         o 3) listen for clicks, show visual indication of choice
//         o 4) fetch the result of the server

//         o 7) show the result from the server on the page
