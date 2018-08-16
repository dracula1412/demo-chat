const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
mongoose.connect("mongodb://localhost:27017/chat-demo", { useNewUrlParser: true });
const WEBPURIFY_URL = require('../global-const').WEBPURIFY_URL

const blackListSchema = mongoose.Schema({
  text: String,
});
const BlackList = mongoose.model("BlackList", blackListSchema);

router.get('/', (req, res) => {
  BlackList.find((err, response) => {
    if (err)
      res.json({ message: "Database error", type: "error" });
    else
      res.json(response);
  });
});

router.post('/', (req, res) => {
  const newBlackListInfo = req.body;
  const webpurifyApi = `${WEBPURIFY_URL}&method=webpurify.live.addtoblacklist&word=${newBlackListInfo.text}`;
  request(webpurifyApi, (error) => {
    if (error) {
      res.json({ message: `Webpurify error when add black list word ${newBlackListInfo.text}`, type: "error" });
    } else {
      const newBlackList = new BlackList({
        text: newBlackListInfo.text,
      });

      newBlackList.save((err, BlackList) => {
        if (err)
          res.json({ message: "Database error", type: "error" });
        else
          res.json({ message: "New black list added", type: "success", data: newBlackList });
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  const blacklist = await BlackList.findById(req.params.id);
  if (blacklist) {
    const webpurifyApi = `${WEBPURIFY_URL}&method=webpurify.live.removefromblacklist&word=${blacklist.text}`;
    request(webpurifyApi, (error) => {
      if (error) {
        res.json({ message: `Webpurify error when remove black list word ${blacklist.text}`, type: "error" });
      } else {
        BlackList.findByIdAndRemove(req.params.id, (err, response) => {
          if (err)
            res.json({ message: "Error in deleting record id " + req.params.id, type: "error" });
          else
            // TODO: remove all prohibit word in the existing messages
            // Reference to `purifyText` field in the `messages` collection
            res.json({ message: "Black list with id " + req.params.id + " removed.", data: response });
        });
      }
    });
  } else {
    res.json({ message: "Black list not found with id " + req.params.id });
  }
});

module.exports = router;
