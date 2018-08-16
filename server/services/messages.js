const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat-demo", { useNewUrlParser: true });
const { promisify } = require('util');
const request = promisify(require('request'));
const _ = require('lodash');
const WEBPURIFY_URL = require('../global-const').WEBPURIFY_URL

const messageSchema = mongoose.Schema({
  text: String,
  purifyText: String,
});
const Message = mongoose.model("Message", messageSchema);

const findAll = async () => {
  let result;
  await Message.find((err, response) => {
    if (err)
      console.log('Database error when find all messages');
    else
      result = response;
  });
  return result;
}

const create = async (data) => {
  let error;
  const webpurifyApi = `${WEBPURIFY_URL}&method=webpurify.live.return&text=${data.text}`;
  let purifyText = [];
  const res = await request(webpurifyApi).catch(err => console.log(err));
  if (res && res.body) {
    const expletive = JSON.parse(res.body).rsp.expletive;
    if (expletive) {
      if (typeof(expletive) === 'string') {
        purifyText.push(expletive);
      } else {
        purifyText = expletive;
      }
    }
  }
  const newMessage = new Message({
    purifyText,
    text: data.text,
  });
  
  await newMessage.save((err, Message) => {
    if (err) {
      error = true;
      console.log('Database error when create a new message');
    }
  });
  return error ? undefined : newMessage;
}

const remove = async (id) => {
  let result;
  await Message.findByIdAndRemove(id, (err, response) => {
    if (err)
      console.log('Database error when delete a message');
    else
      result = response;
  });
  return result;
}

module.exports = { findAll, create, remove }
