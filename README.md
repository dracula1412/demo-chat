A simple chat service using node.js, express, websocket and Webpurify(profanity filtering SaaS, https://www.webpurify.com/).

1) Chat page
- Send and display message
- Filter words on new message based on blacklist using Webpurify and change text color as red
- Show filtered words at right side and save at DB(mongoDB)

2) Blacklist management page
- Display blacklist
- Add/delete word of blacklist at Webpurify and DB
