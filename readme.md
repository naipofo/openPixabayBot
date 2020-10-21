# Open Pixabay Bot
It's a telegram bot using the [pixabay API](https://pixabay.com/api/docs) to serve images using telegram inline mode
## How it works
![use case scenario video](https://raw.githubusercontent.com/naipofo/openPixabayBot/main/usecaseRecording.webp)

The bot is quite simple. After getting a request form telegram, it fetches pitcures from pixabay API and responds with them to telegram.
## How to deploy
- Clone reposytory to your local drive
- Fill `example.env` with your api keys:
  * [Telegram bot father](https://t.me/botfather)
  * [Pixabay api](https://pixabay.com/api/docs)
- rename to `.env` and copy to the `src/` folder
- run `npm install` or `yarn install` to install all modules
- run `node main.js` to start the bot
## Build using
- [node.js](https://nodejs.org)
- [telegraf.js](https://telegraf.js.org)
- [Pixabay API](https://pixabay.com/api/docs)
