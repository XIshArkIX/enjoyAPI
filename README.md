# enjoyAPI
Враппер для EnjoyMickey API

## Установка
```bash
$ npm install sqdshcom/enjoyAPI --save
```

## Пример работы
```js
const token = 'тут-токен';
const enjoyAPI = require('enjoyAPI');
const client = new enjoyAPI(token);

client.check('123456789012345678') // Проверить пользователя на наличие в ЧС проекта EnjoyMickey
    .then((res) =>
        console.log(res);
        /*
            При отсутствии: {
                userID: '123456789012345678',
                active: false,
                reason: null
            }
            При присутствии: {
                userID: '123456789012345678',
                active: true,
                reason: 'Очень плохой пользователь Discord'
            }
        */
    )
    .catch((err) =>
        console.error(err) // Если есть ошибка, ловим ОБЯЗАТЕЛЬНО
    );
```
