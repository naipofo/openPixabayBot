const { Telegraf } = require('telegraf') // telegram api
const Markup = require('telegraf/markup')
const fetch = require('node-fetch'); // used to get photos from pixabay API

// get keys from .env file
require('dotenv').config();
const pixabayKey = process.env.PIXABAY_API_KEY
const bot = new Telegraf(process.env.BOT_TOKEN)
const pixabayPageSize = process.env.MAX_RESULTS
const botNickname = process.env.BOT_NAME

// about bot message
bot.start(ctx=>{
  ctx.replyWithDocument("https://raw.githubusercontent.com/naipofo/openPixabayBot/master/sticker.webp");
  ctx.replyWithHTML(`This bot uses pixabay API to search for images and sends them via telegram inline.
Try it with <code>@${botNickname} car</code>
Built with node and telegraf.js`,
  Markup.inlineKeyboard([
    Markup.urlButton('Github repo', 'https://github.com/naipofo/openPixabayBot'),
    Markup.urlButton('Pixabay', 'https://pixabay.com')
  ]).extra());
})

bot.on('inline_query', ctx=>{  
  if (ctx.inlineQuery.query == "") { // no query
    ctx.answerInlineQuery([],{
      switch_pm_text: "about bot",
      switch_pm_parameter: "about"
    })
  } else {
    fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${ctx.inlineQuery.query}&per_page=${pixabayPageSize}&image_type=photo`) // fetch from pixabay api
    .then(res => res.json()) // convert to json
    .then(json=>{
      const d = json;
      let inlineResult = [];
      d.hits.forEach(e => { // map to telegram api scheme
        inlineResult.push({
          type: "photo",
          id: e.id,
          photo_url:e.webformatURL,
          thumb_url:e.previewURL,
          photo_width:e.webformatWidth,
          photo_height:e.webformatHeight
        })
      });
      ctx.answerInlineQuery(inlineResult)
    })
  }
})

bot.launch()
