const getResponse = (msg) => {
    const API = "https://s1.navinda.xyz/ciri_bot/interact/";

    return new Promise((resolve, reject) => {
        sendRequest(API, msg).then(res => {
            resolve(res);
        }).catch((e) => {
            reject("Sorry. I didn't quite understand that.");
        });
    });
}

const sendRequest = (URL, msg) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}${msg}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            })
            .catch(e => {
                reject(e);
            })
    });
}

export default getResponse;