import sendHttpRequest from "./HTTPRequest";
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
    const turnCreate =  await sendHttpRequest(
        'POST', 'http://localhost:9090/app/v1/startGame', turn);
    turnId = turnCreate.id_turn;
    document.getElementById('secretWord').value = '';
}

async function getSecretWord() {

    const responseData = await sendHttpRequest(
        'GET',
        'http://localhost:9090/app/v1/getWord',
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
                sendHttpRequest('POST', `http://localhost:9090/app/v1/guessLetter/${letter}`, hangManTurn);
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
    const responseData = await sendHttpRequest(
        'GET',
        'http://localhost:9090/app/v1/StillNotWinner'
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

    sendHttpRequest('PUT', 'http://localhost:9090/app/v1/updateTurn', HangManTurn);

}

export {getSecretWord, guessSecretWord,isWinner, createTurn};
