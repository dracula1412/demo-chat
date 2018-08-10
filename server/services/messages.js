var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat-demo", { useNewUrlParser: true });

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
  var newMessage = new Message({
    text: data.text,
    purifyText: data.purifyText,
  });
  
  await newMessage.save(function(err, Message) {
    if (err)
      error = true;
      console.log('Database error when create a new message');
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
