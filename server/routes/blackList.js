var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/chat-demo", { useNewUrlParser: true });

var blackListSchema = mongoose.Schema({
  text: String,
});
var BlackList = mongoose.model("BlackList", blackListSchema);

router.get('/', function(req, res) {
  BlackList.find(function(err, response) {
    if (err)
      res.json({ message: "Database error", type: "error" });
    else
      res.json(response);
  });
});

router.post('/', function(req, res) {
  var newBlackListInfo = req.body;
  var newBlackList = new BlackList({
    text: newBlackListInfo.text,
  });

  newBlackList.save(function(err, BlackList) {
    if (err)
      res.json({ message: "Database error", type: "error" });
    else
      res.json({ message: "New black list added", type: "success", data: newBlackList });
  });
});

router.delete('/:id', function(req, res){
  BlackList.findByIdAndRemove(req.params.id, function(err, response) {
    if (err)
      res.json({ message: "Error in deleting record id " + req.params.id });
    else
      res.json({ message: "Black list with id " + req.params.id + " removed.", data: response });
  });
});

module.exports = router;
