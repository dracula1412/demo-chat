const wsUri = "ws://localhost:8000/";

const onMessage = (response, actionCreator) =>
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
    case 'removeMessage': {
      actionCreator.removeMessage(dataObj.data);
      break;
    }
    default: {
      /* eslint-disable no-console */
      console.log(`Unexpected data -> ${dataObj}`);
      break;
    }
  }
}

export default {
  websocket: null,
  init(actionCreator) {
    this.websocket = new WebSocket(wsUri);
    // websocket.onopen = (evt) => { onOpen(evt) };
    // websocket.onclose = (evt) => { onClose(evt) };
    this.websocket.onmessage = (response) => { onMessage(response, actionCreator) };
    // websocket.onerror = (evt) => { onError(evt) };
  },
  send(evt) {
    this.websocket.send(evt);
  },
  close() {
    this.websocket.close();
  }
}
