import { questionCards } from "./ask.js"

let places = [
  "sqr0",
  "sqr1",
  "sqr2",
  "sqr3",
  "sqr4",
  "sqr9",
  "sqr14",
  "sqr19",
  "sqr18",
  "sqr17",
  "sqr16",
  "sqr15",
  "sqr10",
  "sqr5",
]

let players = [
  {
    name: "Player 1",
    character: document.querySelector("#player1"),
    position: 0,
    score: 500,
  },
  {
    name: "Player 2",
    character: document.querySelector("#player2"),
    position: 0,
    score: 500,
  },
]

let currentPlayer = 0
let currentQu = null

const message = document.querySelector("#message")
const rollBt = document.querySelector("#rollDice")
const card = document.querySelector(".card")

const messageScore1 = document.querySelector("#scorep1")
const messageScore2 = document.querySelector("#scorep2")

const trueBt = document.querySelector("#true")
const falseBt = document.querySelector("#false")

const dicenums = document.querySelector("#dicenum")
const flip = document.querySelector(".flip-card-inner")

function clearSquare(posIndex) {
  const square = document.getElementById(places[posIndex])
  if (square) square.innerText = ""
}

function init() {
  currentPlayer = 0
  message.innerText = `${players[currentPlayer].name}'s turn`
  updateBoard()
}

function rollDice() {
  const player = players[currentPlayer]
  clearSquare(player.position)

  let dice = Math.floor(Math.random() * 6) + 1
  player.position = (player.position + dice) % places.length

  dicenums.innerText = ` ${dice}`
  actionPlaces(player)
  updateBoard()
  if (player.score <= 0) {
    rollBt.disabled = true

    winners()
    return
  }
}

function winners() {
  let winner = players[(currentPlayer + 1) % players.length]

  // alert(`${winner.name} wins!`)
  message.innerText = `${winner.name} wins!`
  message.style.fontSize = "2.5rem"
  updateBoard()
}

function updateBoard() {
  players.forEach((player) => {
    const square = document.getElementById(places[player.position])
    if (square) square.innerText = player.character.innerText
  })
}

function cards() {
  const randomIndex = Math.floor(Math.random() * questionCards.length)
  currentQu = questionCards[randomIndex]
  card.innerText = currentQu.question
  message.innerText = `${players[currentPlayer].name}, answer the question!`
  rollBt.disabled = true
  flip.style.transform = "rotateY(180deg)"
}

function actionPlaces(player) {
  if (player.position === 1) {
    player.score += 100
    message.innerText = `${player.name} collected 100 Galleons!`
    updateScore(player)
  }
  // ================================================================================
  else if (player.position === 4) {
    player.score -= 300
    if (player.score < 0) player.score = 0
    message.innerText = `${player.name} went to Azkaban! Lose 300 Galleons.`
    updateScore(player)
  }
  // ================================================================================
  else if (player.position === 9) {
    player.score = 0
    updateScore(player)
    message.innerText = `${player.name} landed on Dark Mark! Game over!`
  }
  // ================================================================================
  else {
    cards()
  }
}

function updateScore(player) {
  messageScore1.innerText = `${players[0].score} Galleons`
  messageScore2.innerText = `${players[1].score} Galleons`
}

function checkAnswer(playerAnswer) {
  if (!currentQu) return

  const player = players[currentPlayer]

  if (playerAnswer === currentQu.answer) {
    card.innerText = "Correct! You gain 50 Galleons."
    player.score += 50
  } else {
    card.innerText = "Wrong! You lose 100 Galleons."
    player.score -= 100
  }

  updateScore(player)

  currentQu = null
  rollBt.disabled = false
  currentPlayer = (currentPlayer + 1) % players.length
  message.innerText += ` Now it's ${players[currentPlayer].name}'s turn.`
}

// Event listeners
rollBt.addEventListener("click", rollDice)
trueBt.addEventListener("click", () => checkAnswer(true))
falseBt.addEventListener("click", () => checkAnswer(false))

init()
