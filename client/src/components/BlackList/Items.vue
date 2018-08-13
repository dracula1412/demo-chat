<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar color="teal" dark>
          <v-toolbar-title class="text-xs-center">Blacklist items</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list subheader>
          <v-list-tile
            v-for="item in list"
            :key="item._id"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{item.text}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon @click="remove(item._id)">delete</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import constain from '@/global-const'

export default {
  name: 'blackListItems',
  data: () => ({
    list: [],
  }),
  mounted: function () {
    const api = `${constain.SERVER_URL}black-lists`;
    this.axios.get(api).then((response) => {
      this.list = response.data;
    })
  },
  methods: {
    remove: function (id) {
      console.log('id: ', id);
      this.list.splice(
        this.list.findIndex((i) => i._id === id),
        1,
      );
    }
  },
}
</script>