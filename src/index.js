"use strict";

const line = require('@line/bot-sdk');
const express = require('express');
const option = require('./option');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create Line SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }

  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    //ignore non-text-message event
    return Promise.resolve(null);
  }

  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken, event.source);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
      break;
    case 'postback':

      break;
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }

  return handleText(event.message, event.replyToken, event.source);
}

function handleText(message, replyToken, source) {

  // create a echoing text message
  const echo = { type: 'text', text: message.text };

  if (message.text.indexOf('help') != -1) {


  }

  // use reply API
  return client.replyMessage(replyToken, option.newBios.reply);
}

// listen on port
const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});