<template>
  <v-data-table
    :items="messages"
    class="elevation-1"
    hide-actions
    hide-headers
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.text }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import webSocket from '@/web-socket'

export default {
  name: 'MessageList',
  data: () => ({
    blackList: [],
  }),
  computed: {
    ...mapGetters([
      'messages',
    ])
  },
  mounted: function () {
    // TODO: webSocket event only sent after socket connection established
    setTimeout(function(){
      webSocket.send(JSON.stringify({ action: 'getAll' }));
    }, 1000);
  },
}
</script>
