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

export default sendHttpRequest;