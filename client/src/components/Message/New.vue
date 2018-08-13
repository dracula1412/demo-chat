<template>
  <v-container style="width:700px">
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          solo
          v-model="message"
          label="Input a new messages..."
          append-outer-icon="send"
          @click:append-outer="sentMessage(message)"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewMessage',
  props: {
    newMessage: Function,
  },
  data: () => ({
    message: '',
  }),
  methods: {
    sentMessage: function (message) {
      this.message = '';
      this.$emit('newMessage', message)
    }
  },
}
</script>
