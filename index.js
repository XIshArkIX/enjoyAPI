const path = 'https://api.enjoymickeybot.info';
const { get } = require('https');
const send = (url, token) => {
    return new Promise((resolve, reject) => {
        const req = get(
            encodeURI(path + url),
            (res) => {
                let data = [];
                res.on('data', data = [...data, res]);
                res.on('end', resolve(Buffer.concat(data).toString()));
            }
        );

        req.setHeader('Authorization', token);
        req.on('error', reject(Error('Ошибка в GET запросе')));
        req.end();
    });
}

class EnjoyAPI {
    constructor(token) {
        if (!token)
            throw '[EnjoyAPI] Не указан токен авторизации';
        this.token = token;
    }

    check = (userID) => {
        if(!userID)
            return console.error('[EnjoyAPI] Не указан ID пользователя для проверки.');
        return new Promise((resolve, reject) =>
            send(`/check/${userID}`, this.token)
                .then((res) => {
                    if(![200, 404].includes(res.code))
                        return reject({ error: res });
                    else
                        return resolve({
                            userID: userID,
                            active: (res.code == 200) ? true : false,
                            reason: (res.code == 200) ? res.reason : null
                        });
                })
                .catch((err) => [console.error(err), reject(err)])
        );
    }
}

module.exports = EnjoyAPI;