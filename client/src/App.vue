<template>
  <div id="app">
    <v-app
      dark
      id="inspire"
    >
      <v-navigation-drawer
        fixed
        clipped
        app
      >
        <v-list>
          <v-list-tile class="mt-3" @click="$router.push('/')">
            <v-list-tile-action>
              <v-icon color="grey darken-1">message</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1">Chat</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$router.push('setting')">
            <v-list-tile-action>
              <v-icon color="grey darken-1">settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1">Manage Black List Word</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="red"
        dense
        fixed
        clipped-left
        app
      >
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">Chat demo</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fill-height>
          <v-layout >
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
