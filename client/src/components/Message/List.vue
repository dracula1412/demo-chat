<template>
  <v-data-table
    :items="messages"
    class="elevation-1"
    hide-actions
    hide-headers
  >
    <template slot="items" slot-scope="props">
      <td>
        <span v-for="word in props.item.text.split(' ')" :key="{word} + (Math.floor(Math.random() * 10000) + 1)">
          <span v-if="props.item.purifyText && props.item.purifyText.split(',').includes(word)" style="color: red"> {{word}} </span>
          <span v-else-if="blackListItems && blackListItems.includes(word)" style="color: red"> {{word}} </span>
          <span v-else style="color: white"> {{word}} </span>
        </span>
      </td>
      <td class="justify-center layout px-0">
        <v-icon small @click="deleteMessageById(props.item._id)">delete</v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'
import webSocket from '@/web-socket'

export default {
  name: 'MessageList',
  props: {
    deleteMessage: Function,
  },
  computed: {
    ...mapGetters([
      'messages',
      'blackList',
    ]),
    blackListItems() {
      return this.blackList.map(x => x.text)
    }
  },
  mounted() {
    // TODO: webSocket event only sent after socket connection established
    setTimeout(() => {
      webSocket.send(JSON.stringify({ action: 'getAll' }));
    }, 1000);
  },
  methods: {
    deleteMessageById(id) {
      this.$emit('deleteMessage', id)
    }
  },
}
</script>
