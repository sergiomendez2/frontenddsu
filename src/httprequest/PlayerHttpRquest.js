import sendHttpRequest from "./HTTPRequest";

const select = document.getElementById('playerGuesser');
const select2 = document.getElementById('PlayerGiver');
const tbody = document.getElementById('player-list');
let playerIDList = [];

async function getAllPlayers() {
    const responseData = await sendHttpRequest(
        'GET',
        'http://localhost:9090/app/v1/getListOfPlayers',
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
    const responseData = await sendHttpRequest(
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
   sendHttpRequest(
       'POST',
       'http://192.168.0.7:9090/app/v1/createPlayer', Player);

}

async function deletePlayer() {
    const id = document.getElementById('playerID').value;
    sendHttpRequest('DELETE', `http://192.168.0.7:9090/app/v1/deletePlayer/${id}`);
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
    sendHttpRequest('PUT', 'http://192.168.0.7:9090/app/v1/updatePlayer', Player);
}

export { getAllPlayers, listPlayersInTable, createPlayer, deletePlayer, updatePlayer};