<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon class="primarydark--text" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primarydark--text" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark
      app
      :clipped-left="clipped"
      class="primarydark"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
        icon: 'account_circle',
        title: 'Administrator',
        link:'/'
        },
        {
          icon:'schedule',
          title:'Bus Schedules',
          link:'/schedule'
        },
        {
          icon:'people',
          title:'Our Clientele',
          link:'/customers'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'MetroTrans Inc. Adminstrator'
    }
  },
  name: 'App'
}
</script>
