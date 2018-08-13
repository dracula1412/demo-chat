<template>
  <div>
    <v-text-field
      v-model="name"
      label="Name"
      placeholder="Input black list word"
      required
    ></v-text-field>
    <v-btn @click="add(name)">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </div>
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
      const blacklist = word.trim();
      if (blacklist.length > 0) {
        this.name = '';
        this.addToBlacklist(blacklist);
      }
    },
    clear: function () {
      this.name = '';
    },
  }
}
</script>