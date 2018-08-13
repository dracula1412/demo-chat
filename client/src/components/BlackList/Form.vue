<template>
  <form>
    <v-text-field
      v-model="name"
      label="Name"
      placeholder="Input black list word"
      required
    ></v-text-field>
    <!-- <v-btn @click="submit">submit</v-btn> -->
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>

export default {
  name: 'blackListForm',
  data: () => ({
    name: '',
  }),
  methods: {
    clear: function () {
      this.name = '';
    }
  }
}
</script>