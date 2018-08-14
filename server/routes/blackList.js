var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
mongoose.connect("mongodb://localhost:27017/chat-demo", { useNewUrlParser: true });
var WEBPURIFY_URL = 'http://api1.webpurify.com/services/rest/?api_key=d3fcd3b33d6474b7d01b9e88be4453c8&lang=en&format=json'

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
  const webpurifyApi = `${WEBPURIFY_URL}&method=webpurify.live.addtoblacklist&word=${newBlackListInfo.text}`;
  request(webpurifyApi, function (error) {
    if (error) {
      res.json({ message: `Webpurify error when add black list word ${newBlackListInfo.text}`, type: "error" });
    } else {
      var newBlackList = new BlackList({
        text: newBlackListInfo.text,
      });

      newBlackList.save(function(err, BlackList) {
        if (err)
          res.json({ message: "Database error", type: "error" });
        else
          res.json({ message: "New black list added", type: "success", data: newBlackList });
      });
    }
  });
});

router.delete('/:id', async function(req, res) {
  const blacklist = await BlackList.findById(req.params.id);
  if (blacklist) {
    const webpurifyApi = `${WEBPURIFY_URL}&method=webpurify.live.removefromblacklist&word=${blacklist.text}`;
    request(webpurifyApi, function (error) {
      if (error) {
        res.json({ message: `Webpurify error when remove black list word ${blacklist.text}`, type: "error" });
      } else {
        BlackList.findByIdAndRemove(req.params.id, function(err, response) {
          if (err)
            res.json({ message: "Error in deleting record id " + req.params.id, type: "error" });
          else
            res.json({ message: "Black list with id " + req.params.id + " removed.", data: response });
        });
      }
    });
  } else {
    res.json({ message: "Black list not found with id " + req.params.id });
  }
});

module.exports = router;
