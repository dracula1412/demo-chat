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
### Installation

- Install [npm](https://www.npmjs.com/get-npm)
- Install [mongoDB](https://docs.mongodb.com/manual/installation/)
- Create database name `chat-demo` in `mongoDB`

### Server
- Go to `server` folder
- Install all libraries
  >  $npm install
- Start server:
  > $npm start
- Server up and running at port `8000`

    #### Server includes 2 separate path: HTTP service and WebSocket service
    #### 1. HTTP service:
    Listen on port 8000, it provides APIs
    - Create a new blacklist:
        - URL: /black-lists
        - Method: POST
        - Data:
            - text: String
        - Return JSON:
            ```
            {
              data: {_id: "5b74e7bc25eefd3e16fcb839", text: "gow", __v: 0}
              message: "New black list added",
              type: "success"
            }
            ```
    - List all black list:
        - URL: /black-lists
        - Method: GET
        - Return JSON:
            ```
            [
              {_id: "5b7279f5720cdc25486256a9", text: "test", __v: 0}
              {_id: "5b727a00720cdc25486256ab", text: "meo", __v: 0}
              {_id: "5b7296652c9eb22b0fb6651e", text: "hi", __v: 0}
              {_id: "5b74e7bc25eefd3e16fcb839", text: "gow", __v: 0}
            ]
            ```
    - Delete a blacklist:
        - URL: /black-lists/:id
        - Method: DELETE
        - Return JSON:
            ```
            {
              data:{_id: "5b74e7bc25eefd3e16fcb839", text: "gow", __v: 0},
              message: "Black list with id 5b74e7bc25eefd3e16fcb839 removed."
            }
            ```
    #### 2.WebSocket service:
    Located in `ws://localhost:8000/`, after socket connection established, it supports some message event with format:
    - Get all message:
        - Message format: `{action: "getAll”}`
        - Response to request client with format
            ```
            {
              data: [
                {_id: "5b728346db01882986d2f9d3", purifyText: "test", text: "hello test", __v: 0},
                {_id: "5b728483e17a2529ce79c108", purifyText: "meo", text: "meo me", __v: 0},
                {_id: "5b72858e6d30f52a08586ce5", purifyText: "meo,test", text: "meo meo test test smth", __v: 0},
              ],
              type: "getAllMessages"
            }
            ```
    - Create a new message:
        - Message format: `{action: "create", body: {text: "new msg"}}`
        - Response to all clients with format
            ```
            {
              type: "createMessage",
              data: {_id: "5b74eba525eefd3e16fcb83a", purifyText: "", text: "new msg"}
            }
            ```
    - Delete message:
        - Message format: `{id: "5b74eba525eefd3e16fcb83a", action: "remove"}`
        - Response to all clients with format
            ```
            {
              data: {_id: "5b74eba525eefd3e16fcb83a", purifyText: "", text: "new msg", __v: 0}
              type: "removeMessage"
            }
            ```

### Client
- Go to `client` folder
- Install all libraries
  > $npm install
- Start client:
  > $npm run serve

Client up and running at port `8080`
