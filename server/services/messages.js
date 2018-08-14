var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat-demo", { useNewUrlParser: true });
var { promisify } = require('util');
var request = promisify(require('request'));
var _ = require('lodash');
var WEBPURIFY_URL = require('../global-const').WEBPURIFY_URL

var messageSchema = mongoose.Schema({
  text: String,
  purifyText: String,
});
var Message = mongoose.model("Message", messageSchema);

let findAll = async () => {
  let result;
  await Message.find(function(err, response) {
    if (err)
      console.log('Database error when find all messages');
    else
      result = response;
  });
  return result;
}

let create = async (data) => {
  let error;
  const webpurifyApi = `${WEBPURIFY_URL}&method=webpurify.live.return&text=${data.text}`;
  let purifyText = [];
  var res = await request(webpurifyApi).catch(err => console.log(err));
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
  var newMessage = new Message({
    purifyText,
    text: data.text,
  });
  
  await newMessage.save(function(err, Message) {
    if (err) {
      error = true;
      console.log('Database error when create a new message');
    }
  });
  return error ? undefined : newMessage;
}

let remove = async (id) => {
  let result;
  await Message.findByIdAndRemove(id, function(err, response) {
    if (err)
      console.log('Database error when delete a message');
    else
      result = response;
  });
  return result;
}

module.exports = { findAll, create, remove }
