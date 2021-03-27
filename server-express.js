// we will use express
const express = require('express')
const app = express()

// this setting means that we're getting out info from fetch
//  rather than from a form. if we want a form's submit to hit our server,
//  we need express.urlencoded.
app.use(express.json({ extended: true }))

// this setting means that instead of looking in the "views" folder for HTML, we're looking in the main directory
app.set(`views`, __dirname)

// this means that whenever we get a GET request (browser load) for `/`, we send the file `index.html`
app.get(`/`, (request, response) => {
    response.sendFile(__dirname + `/index.html`)
})

// whenever we get a GET request for a static file, like one we just have, we just send it back
//   similar to the previous `/` endpoint
// this makes it so that we don't have to do app.get('/css/style.css') and all of the other files and images
app.use(express.static(`public`))

// our server is listening for requests, on port 3000
app.listen(3000, () => {
    console.log(`listening on 3000`)
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// THIS IS STUFF ONLY FOR RockPaperScissorsLizardSpock! everything above here is a standard server

app.get(`/choose`, (request, response) => {
    // request.query -> { choice: "scissors" } // doesn't have to be scissors
    // request.query.choice -> "scissors"
    const playerChoice = request.query.choice
    const botChoice = getBotChoice()

    const result = determineWinner(playerChoice, botChoice)
    response.json({ result: result, botChoice: botChoice })
})

// utility functions
function getBotChoice() {
    // define the options
    const options = ["rock", "paper", "scissors", "lizard", "spock"]
    // get a random number which corresponds to an option
    const randomIndex = Math.floor(Math.random() * options.length)

    // get the random option
    return options[randomIndex]
}

function determineWinner(playerChoice, botChoice) {
    // we look up in our mapping the moves which our move (playerChoice) can beat
    //   as in, we get the bot moves which would cause us to win
    //   or, the winningBotMoves
    const winningBotMoves = opposingHands[playerChoice]
    // three possible results:
    // win, lose, tie
    if (playerChoice === botChoice) {
        return "tie"
    } else if (winningBotMoves.includes(botChoice)) {
        return "win"
    } else {
        return "lose"
    }
}

const opposingHands = {
    // rock BEATS lizard and scissors
    // as in, if we pick rock, then we know that lizard and scissors cause us to win
    rock: [`lizard`, `scissors`],
    paper: [`rock`, `spock`],
    scissors: [`paper`, `lizard`],
    lizard: [`spock`, `paper`],
    spock: [`rock`, `scissors`]
}
