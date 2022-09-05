import sendHttpRequest from "./HTTPRequest";
const select = document.getElementById('playerX');
const select2 = document.getElementById('playerO');


async function getTicTacToePlayers() {
    const response = await sendHttpRequest(
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




export {getTicTacToePlayers};