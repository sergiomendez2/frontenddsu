import sendHttpRequest from "../httprequest/HTTPRequest";

let turnId;
let playerX;
let playerO;


const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn


try {
  restartButton.addEventListener('click', startGame)
}catch(e) {
    console.log(e);
}

async function createTicTacToeTurn(){

  const tttTurn = {
    finished: false,
    playerX: {
      id: document.getElementById('playerX').value,
      name: document.getElementById('playerX').options[document.getElementById('playerX').selectedIndex].text
    },
    playerO: {
      id: document.getElementById('playerO').value,
      name: document.getElementById('playerO').options[document.getElementById('playerO').selectedIndex].text
    },
    isDraw: false
  }

  const turnedCreated = await sendHttpRequest(
      'POST',
      'http://192.168.0.7:9090/app/v1/startGameTTT',tttTurn);

  turnId = turnedCreated.id_turn;
  playerO = turnedCreated.playerO;
  playerX = turnedCreated.playerX;
  startGame();
}

function startGame() {

  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    /*some logic here*/
    const tttTurnCompleted = {
        id_turn: turnId,
        finished: true,
        winner: null,
        draw:true
    };
    sendHttpRequest( 'PUT', 'http://192.168.0.7:9090/app/v1/updateTurnTTT',tttTurnCompleted);
    winningMessageTextElement.innerText = 'Draw!'

  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's":"X's"} Wins!`
    if(!draw) {
        const tttTurnCompleted = {
            id_turn: turnId,
            finished: true,
            winner: circleTurn ? playerO : playerX,
            isDraw:false
        };
        sendHttpRequest( 'PUT', 'http://192.168.0.7:9090/app/v1/updateTurnTTT',tttTurnCompleted);
    }
  }
  winningMessageElement.classList.add('show')
  setTimeout(() => {
    document.location.reload();
  }, 2000);
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

export  {createTicTacToeTurn};
