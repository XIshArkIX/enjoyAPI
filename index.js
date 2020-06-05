const path = 'https://api.enjoymickeybot.info';
const { get } = require('https');
const send = (url, token, callback) => {
    const req = get(encodeURI(path + url), (res) => {
        let data = [];
        res.on('data', (d) => data = [...data, d]);
        res.on('end', callback(undefined, Buffer.concat(data).toString()));
    });

    req.setHeader('Authorization', token);
    req.on('error', callback('Ошибка в GET запросе', undefined));
    req.end();
}

class EnjoyAPI {
    constructor(token) {
        if (!token) throw new Error('[EnjoyAPI] Не указан токен авторизации');
        this.token = token;
    }

    check(userID) {
        if(!userID) return console.error("[EnjoyAPI] Не указан ID пользователя для проверки.");
        return new Promise((resolve, reject) =>
            send(`/check/${userID}`, this.token, (err, res) => {
                if (err)
                    return reject(err);
                if (![200, 404].includes(res.code))
                    return resolve({ error: res });
                else
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
