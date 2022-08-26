const form = document.querySelector('#create-word form');

function sendHttpRequest(method, url, data) {
    return  fetch(url,{
        method: method,
        body: data
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

//create a new game
async function CreateTurn(player1, player2, secretWord) {
    const Turn = {
        playerGiver: player1,
        playerGuesser: player2,
        secretWord: secretWord,
    };
    const fd = new FormData();
    fd.append('playerGiver', player1);
    fd.append('playerGuesser', player2);
    fd.append('secretWord', secretWord);
    sendHttpRequest('POST', 'http://localhost:8080/', fd);
}

async function getSecretWord() {
    const responseData = await sendHttpRequest(
        'GET',
        'http://localhost:8080/'
    );
    const word = responseData;
}


/*check if the letter enter exist in the array of the word using put method*/
async function checkLetter(letter) {
    const responseData = await sendHttpRequest(
        'PUT',
        'http://localhost:8080/',

    );
}


/*here we send the secreteWord to the server*/
form.addEventListener('submit', event =>{
    event.preventDefault();
    const secretWord = event.currentTarget.querySelector('#secret-word').value;
    const player1 = event.currentTarget.querySelector('#player1').value;
    const player2 = event.currentTarget.querySelector('#player2').value;
    CreateTurn(player1, player2, secretWord);
    getSecretWord();
})
