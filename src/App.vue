<template>
  <v-app>
    <div v-if="isUserAuthenticated">
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      width="260"
      id="appDrawer"
    >
      <v-toolbar color="primarydark darken-1" >
        <img v-bind:src="fetchLogo" height="60" alt="MetroTrans Inc.">
      </v-toolbar>
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
      <v-spacer></v-spacer>
      <settings-view></settings-view>
      <v-menu offset-y origin="center center" :nudge-bottom="10"transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/static/profile/man_profile.png" alt="admin"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in profileItems" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
     </v-toolbar>
    <v-content>
      <router-view/>
      <v-footer :fixed="fixed" app>
        <span>MetroTrans Inc.&copy; 2018</span>
        <v-spacer></v-spacer>
        <div class="text-xs-center">
          <v-rating :readonly="true" v-model="rating"></v-rating>
        </div>
      </v-footer>
    </v-content>

      <v-fab-transition>
        <v-btn fab="fab" small dark="dark" fixed="fixed" bottom="bottom" right="right" color="red" v-scroll="onScroll" v-show="fab" @click="toTop">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
    <div v-else-if="!isUserAuthenticated">
      <v-content>
        <div class="page-wrapper">
          <router-view></router-view>
        </div>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      settingsTab:false,
      fab:false,
      clipped: false,
      drawer: true,
      fixed: false,
      rating:3,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'MetroTrans Inc. Adminstrator',
      scrollSettings:{
        maxScrollbarLength: 160
      },
      profileItems:[
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: (e) => {
            this.onCloseSettingsTab();
          }
        },
        {
          icon: 'exit_to_app',
          href: '/',
          title: 'Logout',
          click: (e) => {
            this.onLogout();
          }
        }
      ]
    }
  },
  methods:{
    handleDrawerToggler(){
      this.drawer = !this.drawer
    },
    onScroll () {
      if (typeof window === 'undefined') return;

      const top = window.pageYOffset ||
        document.documentElement.offsetTop ||
        0;

      this.fab = top > 300;
    },
    toTop () {
      this.$router.push({ hash: '' });
      this.$vuetify.goTo(0);
    },
    onLogout(){
      this.$store.dispatch('onLogout');
      this.$router.push('/');
    },
    onCloseSettingsTab(){
      this.settingsTab = !this.settingsTab
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
    fetchLogo(){
      return '/static/logo/metro_white.png'
    },
    isUserAuthenticated(){
      return this.$store.state.token !== null && this.$store.state.token !== undefined
    }
  },
  name: 'App'
}
</script>
