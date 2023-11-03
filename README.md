# magnit-hackathon-2023

## Клиент

Скопируйте `.env.example` в `.env` и отредактируйте `.env` файл, заполнив в нём все переменные окружения:

```bash
cp client/.env.example client/.env
```

Для запуска клиента необходимо выполнить команды в командной строке в папке client:

```bash
npm install
npm run dev
```

Стартует по умолчанию на порте 5173. Чтобы изменить порт необходимо отредактировать соответсвующий параметр в файле `vite.config.ts`.

## Сервер

Дистрибутивы тестового сервера размещены на облачном диске по адресу: https://drive.google.com/drive/folders/1-G2fcxlM2hvd4WDVwJ9VVbSQWQ6pAeyT

Для запуска тестового сервера необходимо распаковать архив в папку server и выполнить команду в командной строке в папке server:

```bash
java -jar magreport-hackathon-server.jar
```

Либо запустить `run.bat` или `run.sh` в соответствующем дистрибутиве с jre.

Сервер стартует по умолчанию на порте 8080. 
Чтобы изменить порт необходимо отредактировать соответсвующий параметр в файле `application.properties`.

Ссылка на swagger: http://localhost:8080/swagger-ui/index.html