import {createPlayer, deletePlayer, updatePlayer} from "./PlayerHttpRquest";
import {createTurn, getSecretWord, guessSecretWord} from "./HangManHttpsRequest";
import {filterByStatistic} from "./StatatisticHttpRequest";
import {createTicTacToeTurn} from "../tictactoe/tttgame";


function executeButton(){
    try {
        const createP = document.getElementById('create-player');
        createP.addEventListener('click', createPlayer);

        const deleteP = document.getElementById('delete-player');
        deleteP.addEventListener('click', deletePlayer);

        const updateP = document.getElementById('update-player');
        updateP.addEventListener('click', updatePlayer);

    }catch (e) {
        console.log(e);
    }
    try {
        const guessSW = document.getElementById('guess');
        guessSW.addEventListener('click', guessSecretWord,true);

        const startGame = document.getElementById('new-game');
        startGame.addEventListener('click', createTurn,true);

    }catch (e) {
        console.log(e);
    }
    try {
        const createGame = document.getElementById('new-game');
        createGame.addEventListener('click', createTurn,true);

        const startGame = document.getElementById('star-game');
        startGame.addEventListener('click', getSecretWord,true);

    }catch (e) {
        console.log(e);
    }
    try {
        const fillTable = document.getElementById('filter-game');
        fillTable.addEventListener('click', filterByStatistic, true);
    }catch (e) {
        console.log(e);
    }
    try {
        const turnTTT = document.getElementById('ttt-new-game');
        turnTTT.addEventListener('click', createTicTacToeTurn, true);
    }catch (e) {
        console.log(e);
    }
}

export default executeButton;