var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat-demo", { useNewUrlParser: true });

var messageSchema = mongoose.Schema({
  text: String,
  purifyText: String,
});
var Message = mongoose.model("Message", messageSchema);

router.get('/', function(req, res) {
  Message.find(function(err, response) {
    res.json(response);
  });
});

module.exports = router;
