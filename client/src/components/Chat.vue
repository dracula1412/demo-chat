<template>
  <div>
    <NewMessage @newMessage="newMessageViaSocket"/>
    <MessageList/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NewMessage from '@/components/Message/New.vue'
import MessageList from '@/components/Message/List.vue'
import webSocket from '@/web-socket'

export default {
  name: 'Chat',
  beforeMount: function () {
    webSocket.init({
      receivedMessages: (messages) => {
        this.getListMessages(messages);
      },
      incomingMessage: (message) => {
        this.addNewMessage(message);
      },
    });
  },
  destroyed: function () {
    webSocket.close();
  },
  components: {
    NewMessage,
    MessageList,
  },
  methods: {
    ...mapActions(['listMessages', 'incomingMessage']),
    getListMessages: function (messages) {
      this.listMessages(messages);
    },
    newMessageViaSocket: function (message) {
      const data = {
        action: 'create',
        body: {
          text: message,
          purifyText: message,
        }
      }
      webSocket.send(JSON.stringify(data));
    },
    addNewMessage: function (message) {
      this.incomingMessage(message);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
