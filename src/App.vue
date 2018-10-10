<template>
  <v-app>
    <v-navigation-drawer
      persitent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      absolute
    >
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          value="true"
          v-for="item in menuItems"
          :key="item.title"
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

        <v-list-tile
        v-if="isUserAuthenticated"
        @click.native="onLogout"
        router
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark
      app
      :clipped-left="clipped"
      class="primarydark"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title> <router-link to="/home" tag="span" style="cursor: pointer;" >MetroTrans Inc. Admin</router-link></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>MetroTrans Inc.&copy; 2018</span>
      <v-spacer></v-spacer>
      <div class="text-xs-center">
        <v-rating :readonly="true" v-model="rating"></v-rating>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      rating:3,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'MetroTrans Inc. Adminstrator'
    }
  },
  methods:{
    onLogout(){
      this.$store.dispatch('onLogout');
      this.$router.push('/');
    }
  },
  computed:{
    menuItems(){
      let menuItems = [
        {icon:'face',title:'Login',link:'/'}
      ];
      if(this.isUserAuthenticated){
        menuItems = [
          {icon: 'home', title: 'Home', link:'/home'},
          {icon:'schedule', title:'Bus Schedules', link:'/schedule'},
          {icon:'people', title:'Our Clientele', link:'/customers'},
          {icon:'attach_money', title:'Tickets Payments', link:'/payments'}
        ]
      }
      return menuItems;
    },
    isUserAuthenticated(){
      return this.$store.state.token !== null && this.$store.state.token !== undefined
    }
  },
  name: 'App'
}
</script>
