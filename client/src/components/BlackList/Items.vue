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
            v-for="item in blackList"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'blackListItems',
  computed: {
    ...mapGetters([
      'blackList',
    ])
  },
  mounted: function () {
    this.getBlackList();
  },
  methods: {
    ...mapActions(['getBlackList', 'removeFromBlacklist']),
    remove: function (id) {
      this.removeFromBlacklist(id);
    }
  },
}
</script>