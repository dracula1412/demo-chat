<template>
  <form>
    <v-text-field
      v-model="name"
      label="Name"
      placeholder="Input black list word"
      required
    ></v-text-field>
    <v-btn @click="add(name)">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'blackListForm',
  data: () => ({
    name: '',
  }),
  methods: {
    ...mapActions(['addToBlacklist']),
    add: function(word) {
      this.name = '';
      this.addToBlacklist(word);
    },
    clear: function () {
      this.name = '';
    },
  }
}
</script>