/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTurn": () => (/* binding */ createTurn),
/* harmony export */   "getSecretWord": () => (/* binding */ getSecretWord),
/* harmony export */   "guessSecretWord": () => (/* binding */ guessSecretWord),
/* harmony export */   "isWinner": () => (/* binding */ isWinner)
/* harmony export */ });
/* harmony import */ var _HTTPRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

const form = document.querySelector('#create-word form');
const tries = document.getElementById('tries_left');

const figureParts = document.querySelectorAll('.figure-part');
const secretWordDiv = document.getElementById('hangman-word');

let secretWord = document.createElement('h1');
let isLetterExist = false;
let maxTries = 8;

let letter;
let isNotWinner = true;
let turnId;

const wrongLetters = [];
async function createTurn() {
    const turn = {
        finished:false,
        playerGuesser: {
            id: document.getElementById('playerGuesser').value,
            name: document.getElementById('playerGuesser').options[document.getElementById('playerGuesser').selectedIndex].text
        },
        playerGiver: {
            id: document.getElementById('PlayerGiver').value,
            name: document.getElementById('PlayerGiver').options[document.getElementById('PlayerGiver').selectedIndex].text
        },
        secreteWord: document.getElementById('secretWord').value,
        hangedMan: false
    }
    const turnCreate =  await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'POST', 'http://192.168.0.7/:9090/app/v1/startGame', turn);
    turnId = turnCreate.id_turn;
    document.getElementById('secretWord').value = '';
}

async function getSecretWord() {

    const responseData = await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'GET',
        'http://192.168.0.7:9090/app/v1/getWord',
    );
    const word = responseData;


    secretWord.innerHTML = word;
    secretWordDiv.appendChild(secretWord);
}

async function guessSecretWord() {
    isWinner();
    if (isNotWinner === true) {
        if (maxTries > 0) {
            letter = document.getElementById('letter').value;
            const hangManTurn = {
                id_turn: turnId
            }
            const responseData = await
                (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', `http://192.168.0.7:9090/app/v1/guessLetter/${letter}`, hangManTurn);
            isLetterExist = responseData;
            if (isLetterExist) {
                getSecretWord();
                tries.innerHTML = maxTries.toString();


            } else {
                maxTries--;
                wrongLetters.push(letter);
                tries.innerHTML = maxTries.toString();
                figureParts.forEach((part, index) => {
                    const errors =wrongLetters.length;
                    if (index < errors) {
                        part.style.display = 'block';
                    } else {
                        part.style.display = 'none';
                    }
                });
            }
        } else {
               alert('YOU LOST');
               updateTurn();
            secretWord.innerHTML = 'YOU LOST';
            turnId =0;
        }
    }
    document.getElementById('letter').value = '';
    document.getElementById('letter').focus();
    isWinner();
}

async function isWinner() {
    const responseData = await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'GET',
        'http://192.168.0.7:9090/app/v1/StillNotWinner'
    );
    isNotWinner = responseData;
    if(isNotWinner === false){
        alert('YOU WON');
        updateTurn();
        secretWord.innerHTML = 'YOU WON';
        turnId =0;
    }
}

async function updateTurn() {
    var wasLoser = false;
    if (maxTries === 0) {
        wasLoser = true;
    } else {
        wasLoser = false;
    }

    const HangManTurn = {
        id_turn: turnId,
        finished: true,
        hangedMan: wasLoser
    }

    ;(0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])('PUT', 'http://192.168.0.7:9090/app/v1/updateTurn', HangManTurn);

}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function sendHttpRequest(method, url, data) {
    return  fetch(url,{
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'Content-Type': 'application/json' } : {}
    }).then((responseData) => {
        if(responseData.status >=200 && responseData.status < 300) {
            return responseData.json();
        }else{
            responseData.json();
            throw new Error('something went wrong -server side!!');
        }

    }).catch(error =>{
        console.log(error);
        throw new Error('something went wrong--server side!!');
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendHttpRequest);

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer),
/* harmony export */   "deletePlayer": () => (/* binding */ deletePlayer),
/* harmony export */   "getAllPlayers": () => (/* binding */ getAllPlayers),
/* harmony export */   "listPlayersInTable": () => (/* binding */ listPlayersInTable),
/* harmony export */   "updatePlayer": () => (/* binding */ updatePlayer)
/* harmony export */ });
/* harmony import */ var _HTTPRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const select = document.getElementById('playerGuesser');
const select2 = document.getElementById('PlayerGiver');
const tbody = document.getElementById('player-list');
let playerIDList = [];

async function getAllPlayers() {
    const responseData = await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'GET',
        'http://192.168.0.7:9090/app/v1/getListOfPlayers',
    );
    const list = responseData;

    for(var i = 0; i < list.length; i++){
        var option = document.createElement("option");
        option.text = list[i].name;
        option.value = list[i].id;
        select.add(option);
        select2.add(option.cloneNode(true));
    }
}

async function listPlayersInTable() {
    const responseData = await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'GET',
        'http://192.168.0.7:9090/app/v1/getListOfPlayers',
    );
    const list = responseData;

    try {
        for(var i = 0; i < list.length; i++){
            playerIDList.push(list[i].id);
            var tr = document.createElement("tr");
            var id = document.createElement("td");
            var name = document.createElement("td");
            var type = document.createElement("td");

            id.ClassName += "text-left";
            name.ClassName += "text-left";
            type.ClassName += "text-left";

            id.innerHTML = list[i].id;
            name.innerHTML = list[i].name;
            type.innerHTML = list[i].typePlayer.name;

            tr.appendChild(id);
            tr.appendChild(name);
            tr.appendChild(type);
            tbody.appendChild(tr);
        }
        const maxID = Math.max(...playerIDList);
        document.getElementById('playerID').value = maxID + 1;
    } catch (error) {
        console.log(error);
    }
}

async function createPlayer() {
    var id;
    var name;
    const typePlayer = document.getElementById("typePlayer").value;
    if(typePlayer === "Bot"){
        id =1;
    }
    else{
        id =2;
    }
    const Player = {
        id: document.getElementById('playerID').value,
        name: document.getElementById('fullName').value,
        typePlayer: {
            id: id,
            name: typePlayer
        }
    }
   ;(0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
       'POST',
       'http://192.168.0.7:9090/app/v1/createPlayer', Player);

}

async function deletePlayer() {
    const id = document.getElementById('playerID').value;
    (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])('DELETE', `http://192.168.0.7:9090/app/v1/deletePlayer/${id}`);
}

async function updatePlayer() {
    var id;
    var name = document.getElementById('typePlayer').value;
    if (name === "Bot") {
        id = 1;
    }
    else {
        id = 2;
    }
    const Player = {
        id: document.getElementById('playerID').value,
        name: document.getElementById('fullName').value,
        typePlayer: {
            id: id,
            name: document.getElementById('typePlayer').options[document.getElementById('typePlayer').selectedIndex].text
        }
    }
    ;(0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])('PUT', 'http://192.168.0.7:9090/app/v1/updatePlayer', Player);
}



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTicTacToePlayers": () => (/* binding */ getTicTacToePlayers)
/* harmony export */ });
/* harmony import */ var _HTTPRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

const select = document.getElementById('playerX');
const select2 = document.getElementById('playerO');


async function getTicTacToePlayers() {
    const response = await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'GET',
        'http://192.168.0.7:9090/app/v1/getListOfPlayers',
    );
    const list = response;

    for(var i = 0; i < list.length; i++){
        var option = document.createElement("option");
        option.text = list[i].name;
        option.value = list[i].id;
        select.add(option);
        select2.add(option.cloneNode(true));
    }
}






/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PlayerHttpRquest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _HangManHttpsRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _StatatisticHttpRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _tictactoe_tttgame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);






function executeButton(){
    try {
        const createP = document.getElementById('create-player');
        createP.addEventListener('click', _PlayerHttpRquest__WEBPACK_IMPORTED_MODULE_0__.createPlayer);

        const deleteP = document.getElementById('delete-player');
        deleteP.addEventListener('click', _PlayerHttpRquest__WEBPACK_IMPORTED_MODULE_0__.deletePlayer);

        const updateP = document.getElementById('update-player');
        updateP.addEventListener('click', _PlayerHttpRquest__WEBPACK_IMPORTED_MODULE_0__.updatePlayer);

    }catch (e) {
        console.log(e);
    }
    try {
        const guessSW = document.getElementById('guess');
        guessSW.addEventListener('click', _HangManHttpsRequest__WEBPACK_IMPORTED_MODULE_1__.guessSecretWord,true);

        const startGame = document.getElementById('new-game');
        startGame.addEventListener('click', _HangManHttpsRequest__WEBPACK_IMPORTED_MODULE_1__.createTurn,true);

    }catch (e) {
        console.log(e);
    }
    try {
        const createGame = document.getElementById('new-game');
        createGame.addEventListener('click', _HangManHttpsRequest__WEBPACK_IMPORTED_MODULE_1__.createTurn,true);

        const startGame = document.getElementById('star-game');
        startGame.addEventListener('click', _HangManHttpsRequest__WEBPACK_IMPORTED_MODULE_1__.getSecretWord,true);

    }catch (e) {
        console.log(e);
    }
    try {
        const fillTable = document.getElementById('filter-game');
        fillTable.addEventListener('click', _StatatisticHttpRequest__WEBPACK_IMPORTED_MODULE_2__.filterByStatistic, true);
    }catch (e) {
        console.log(e);
    }
    try {
        const turnTTT = document.getElementById('ttt-new-game');
        turnTTT.addEventListener('click', _tictactoe_tttgame__WEBPACK_IMPORTED_MODULE_3__.createTicTacToeTurn, true);
    }catch (e) {
        console.log(e);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (executeButton);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterByStatistic": () => (/* binding */ filterByStatistic)
/* harmony export */ });
/* harmony import */ var _HTTPRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

const tbody = document.getElementById('statistics');
let typeGame;
let statis = [];
let winnerPlayer;
async function getPlayersBYTypeGame() {
    typeGame = document.getElementById('typeGame').value;
    const responseData = await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'GET',
        `http://192.168.0.7:9090/app/v1/getStatisticsByTypeGame/${typeGame}`,
    );
    statis = responseData;

    for (var i = 0; i < statis.length; i++) {
        var tr = tableRowForStatistic(i);
        tbody.appendChild(tr);
    }

}
async function getAllStatistics() {
    const responseData = await (0,_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
        'GET',
        'http://192.168.0.7:9090/app/v1/getStatisticList'
    );
    statis = responseData;

    for (var i = 0; i < statis.length; i++) {
        var tr = tableRowForStatistic(i);
        tbody.appendChild(tr);
    }

}

function tableRowForStatistic(statistic) {
    const tr = document.createElement('tr');
    const id = document.createElement('td');
    const winner = document.createElement('td');
    const loser = document.createElement('td');
    const typeG = document.createElement('td');

    id.innerHTML = statis[statistic].idStatistic;
    winnerPlayer = statis[statistic].winner;
    if(winnerPlayer === null){
        winner.innerHTML = "Draw";
        loser.innerHTML = "Draw";
    }else{
        loser.innerHTML = statis[statistic].loser.name;
        winner.innerHTML = statis[statistic].winner.name;
    }

    typeG.innerHTML = statis[statistic].typeGame;


    tr.appendChild(id);
    tr.appendChild(winner);
    tr.appendChild(loser);
    tr.appendChild(typeG);
    return tr;
}
function filterByStatistic() {
    tbody.innerHTML = '';
    typeGame = document.getElementById('typeGame').value;
    console.log(typeGame);
    if (typeGame === "All") {
        getAllStatistics();
        statis.splice(0, statis.length);
    } else {
        getPlayersBYTypeGame();
        statis.splice(0, statis.length);
    }
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTicTacToeTurn": () => (/* binding */ createTicTacToeTurn)
/* harmony export */ });
/* harmony import */ var _httprequest_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


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

  const turnedCreated = await (0,_httprequest_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])(
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
    (0,_httprequest_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])( 'PUT', 'http://192.168.0.7:9090/app/v1/updateTurnTTT',tttTurnCompleted);
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
        (0,_httprequest_HTTPRequest__WEBPACK_IMPORTED_MODULE_0__["default"])( 'PUT', 'http://192.168.0.7:9090/app/v1/updateTurnTTT',tttTurnCompleted);
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




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _httprequest_HangManHttpsRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _styles_hangman_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _styles_MangedUsers_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _styles_tttgame_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _httprequest_PlayerHttpRquest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _httprequest_TTTHTTPRquest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _httprequest_Buttons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);












(0,_httprequest_Buttons__WEBPACK_IMPORTED_MODULE_7__["default"])();
(0,_httprequest_PlayerHttpRquest__WEBPACK_IMPORTED_MODULE_5__.getAllPlayers)();
(0,_httprequest_TTTHTTPRquest__WEBPACK_IMPORTED_MODULE_6__.getTicTacToePlayers)();
(0,_httprequest_PlayerHttpRquest__WEBPACK_IMPORTED_MODULE_5__.listPlayersInTable)();
(0,_httprequest_HangManHttpsRequest__WEBPACK_IMPORTED_MODULE_0__.isWinner)();













})();

/******/ })()
;