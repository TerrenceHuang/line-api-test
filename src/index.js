"use strict";

const line = require('@line/bot-sdk');
const express = require('express');
const option = require('./option');
const util = require('./util');

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

  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken, event.source);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
    case 'postback':
      let data = event.postback.data;
      console.log("postback: " + data);
      return handlePostback(event.replyToken, data);
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken, source) {

  // create a echoing text message
  const echo = { type: 'text', text: message.text };
  console.log(message.text);
  if (message.text.indexOf('help') != -1) {


  }

  // use reply API
  return client.replyMessage(replyToken, option.newBios.reply);
}

// simple reply function
const handlePostback = (token, text) => {
  let datas = text.split('&');
  let reply;
  switch (datas.length) {
    case 1:
      
      reply = util.cloneObject(option.isio.reply);
      reply.template.actions = reply.template.actions.map(
        (action, index) => {
          action.data = text + '&isio=' + action.data;
          return action;
        }
      );
      return client.replyMessage(token, reply);
    case 2:
      
      reply = util.cloneObject(option.F81216SEC.reply);
      reply.template.actions = reply.template.actions.map(
        (action, index) => {
          action.data = text + '&F81216SEC=' + action.data;
          return action;
        }
      );
      return client.replyMessage(token, reply);
    case 3:

      return client.replyMessage(token, {type: 'text', text: 'start build'});
      break;
  }
};



// listen on port
const port = process.env.PORT || 3010;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});


// const pushMessage = {
//   type: 'text',
//   text: 'Message push!'
// }
// setTimeout(botPushMessage, 10000);

// function botPushMessage() {

//   client.pushMessage("Ud620cb547e8a6daac4c4a03788b20193", pushMessage)
//   .then(() => {
//     console.log('Message push');
//   })
//   .catch(() => {
//     console.log('Message push fail');
//   });

// }