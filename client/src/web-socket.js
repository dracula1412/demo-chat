var websocket;
var wsUri = "ws://localhost:8000/";

function onMessage(response, actionCreator)
{
  const dataObj = JSON.parse(response.data);
  switch(dataObj.type) {
    case 'getAllMessages': {
      actionCreator.receivedMessages(dataObj.data);
      break;
    }
    case 'createMessage': {
      actionCreator.incomingMessage(dataObj.data);
      break;
    }
    default: {
      console.log(`Unexpected data -> ${dataObj}`);
      break;
    }
  }
}

export default {
  init(actionCreator) {
    websocket = new WebSocket(wsUri);
    // websocket.onopen = function(evt) { onOpen(evt) };
    // websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(response) { onMessage(response, actionCreator) };
    // websocket.onerror = function(evt) { onError(evt) };
  },
  send(evt) {
    websocket.send(evt);
  },
  close() {
    websocket.close();
  }
}
