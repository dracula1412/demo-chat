### A simple chat service using:
- node.js
- express
- websocket
- mongoose
- vue, vuex, vue-router, vuetifyjs
- Webpurify(profanity filtering SaaS, https://www.webpurify.com/).

#### 1. Chat page
- Send and display message
- Filter words on new message based on blacklist using Webpurify and change text color as red
- Show filtered words at right side and save at DB(mongoDB)

#### 2. Blacklist management page
- Display blacklist
- Add/delete word of blacklist at Webpurify and DB

-------------
### Instalation

- Install [npm](https://www.npmjs.com/get-npm)
- Install [mongoDB](https://docs.mongodb.com/manual/installation/)
- Create database name `chat-demo` in `mongoDB`

### Server
- Go to `server` folder
- Install all libraries
  >  $npm install
- Start server:
  > $npm start

Server up and running at port `8080`

### Client
- Go to `client` folder
- Install all libraries
  > $npm install
- Start client:
  > $npm run serve

Client up and running at port `8000`
