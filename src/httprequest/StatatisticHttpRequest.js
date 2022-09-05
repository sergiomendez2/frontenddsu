import sendHttpRequest from "./HTTPRequest";
const tbody = document.getElementById('statistics');
let typeGame;
let statis = [];
let winnerPlayer;
async function getPlayersBYTypeGame() {
    typeGame = document.getElementById('typeGame').value;
    const responseData = await sendHttpRequest(
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
    const responseData = await sendHttpRequest(
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
export {filterByStatistic};