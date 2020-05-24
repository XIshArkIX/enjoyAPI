/* jshint esversion: 6 */
const path = "https://api.enjoymickeybot.info";
const { request } = require("https");
function send(url, token) {
    return new Promise((resolve, reject) => {
        let req = request(encodeURI(path + url), (res) => {
            res.setEncoding('utf8');
            res.on('data', (data) => resolve( JSON.parse(data) ));
        });

        req.setHeader("Authorization", token);
        req.on('error', reject);
        req.end();
    });
}

class EnjoyAPI {
    constructor(token) {
        if(!token) return console.error("[EnjoyAPI] Не указан токен авторизации.");
        this.token = token;
    }

    check(userID) {
        if(!userID) return console.error("[EnjoyAPI] Не указан ID пользователя для проверки.");
        return new Promise((resolve) =>
            send(`/check/${userID}`, this.token)
                .then(res => {
                    if(![200, 404].includes(res.code)) return resolve({ error: res });
                    return resolve({
                        userID: userID,
                        active: (res.code == 200) ? true : false,
                        reason: (res.code == 200) ? res.reason : null
                    });
                })
        );
    }
}

module.exports = EnjoyAPI;