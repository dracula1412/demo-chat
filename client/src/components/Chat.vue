<template>
  <div>
    <NewMessage @newMessage="newMessageViaSocket"/>
    <MessageList @deleteMessage="deleteMessageViaSocket"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NewMessage from '@/components/Message/New.vue'
import MessageList from '@/components/Message/List.vue'
import webSocket from '@/web-socket'

export default {
  name: 'Chat',
  beforeMount() {
    webSocket.init({
      receivedMessages: (messages) => {
        this.getListMessages(messages);
      },
      incomingMessage: (message) => {
        this.addNewMessage(message);
      },
      removeMessage: (message) => {
        this.deleteMessage(message);
      }
    });
  },
  mounted() {
    this.getBlackList();
  },
  destroyed() {
    webSocket.close();
  },
  components: {
    NewMessage,
    MessageList,
  },
  methods: {
    ...mapActions(['listMessages', 'incomingMessage', 'getBlackList', 'removeMessage']),
    getListMessages(messages) {
      this.listMessages(messages);
    },
    newMessageViaSocket(message) {
      const data = {
        action: 'create',
        body: {
          text: message,
        }
      }
      webSocket.send(JSON.stringify(data));
    },
    deleteMessageViaSocket(id) {
      const data = {
        id,
        action: 'remove',
      }
      webSocket.send(JSON.stringify(data));
    },
    addNewMessage(message) {
      this.incomingMessage(message);
    },
    deleteMessage(message) {
      this.removeMessage(message);
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
