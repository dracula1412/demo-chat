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
          @keyup.enter="sentMessage(message)"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'NewMessage',
  props: {
    newMessage: Function,
  },
  data: () => ({
    message: '',
  }),
  methods: {
    sentMessage(message) {
      const newMessage = message.trim();
      if (newMessage.length > 0) {
        this.message = '';
        this.$emit('newMessage', newMessage)
      }
    }
  },
}
</script>
