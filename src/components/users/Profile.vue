<template>
<v-container fill-height fluid class="pa-0 ma-0 white">
  <v-layout column class="pa-0 ma-0">
    <v-card clas="elevation-0">
      <v-card-media height="300" src="/static/profile/profile_background.jpg">
        <v-layout column align-center justify-center>
          <v-avatar size="150" class="mx-5 mt-3">
            <img v-bind:src="fetchProfileImage" alt="admin"/>
          </v-avatar>
          <h1 class="white--text">{{this.$store.state.adminstrator.firstName }} {{this.$store.state.adminstrator.lastName}}</h1>
        </v-layout>
      <v-layout justify-start>
        <v-speed-dial class="justify-end"
                      v-model="fab"
                      :top="top"
                      :bottom="bottom"
                      :right="right"
                      :left="left"
                      :direction="direction"
                      :open-on-hover="hover"
                      :transition="transition">
          <v-btn
            slot="activator"
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon>account_circle</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
         <add-admin></add-admin>
          <v-btn
            fab
            dark
            small
            color="indigo"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="red"
            @click.native="snackbar=true"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-layout>
      </v-card-media>
      <v-card-text class="pa-0">
       <v-tabs v-model="selectedTab">
         <v-tab ripple href="#tab-1">
           Profile
         </v-tab>
         <v-tab ripple href="#tab-2">
           Activity
         </v-tab>
         <v-tabs-items v-model="selectedTab">
           <v-tab-item id="tab-1">
             <v-card flat>
               <v-card-text>
                 <v-list two-line class="pa-0">
                   <v-list-tile href="#">
                     <v-list-tile-action>
                       <v-icon color="indigo">work</v-icon>
                     </v-list-tile-action>
                     <v-list-tile-content>
                       <v-list-tile-title>System Administrator</v-list-tile-title>
                       <v-list-tile-sub-title>Job Title</v-list-tile-sub-title>
                     </v-list-tile-content>
                     <v-list-tile-action>
                     </v-list-tile-action>
                   </v-list-tile>
                   <v-divider inset></v-divider>
                   <v-list-tile href="#">
                     <v-list-tile-action>
                       <v-icon color="indigo">phone</v-icon>
                     </v-list-tile-action>
                     <v-list-tile-content>
                       <v-list-tile-title>{{this.$store.state.adminstrator.phoneNumber}}</v-list-tile-title>
                       <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                     </v-list-tile-content>
                     <v-list-tile-action>
                       <v-icon>chat</v-icon>
                     </v-list-tile-action>
                   </v-list-tile>
                   <v-divider inset></v-divider>
                   <v-list-tile href="#">
                     <v-list-tile-action>
                       <v-icon color="indigo">mail</v-icon>
                     </v-list-tile-action>
                     <v-list-tile-content>
                       <v-list-tile-title>{{this.$store.state.adminstrator.emailAddress}}</v-list-tile-title>
                       <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                     </v-list-tile-content>
                     <v-list-tile-action>
                       <v-icon>chat</v-icon>
                     </v-list-tile-action>
                   </v-list-tile>
                 </v-list>
               </v-card-text>
             </v-card>
           </v-tab-item>
         </v-tabs-items>
       </v-tabs>
      </v-card-text>
    </v-card>
    <v-snackbar
      :timeout="8000"
      top
      right
      :color="color"
      v-model="snackbar"
      v-if="success ? snackbar = true : snackbar=false"
    >
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbar = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-layout>
</v-container>
</template>
<script>
  export default{
    data(){
      return{
        direction: 'top',
        fling: false,
        top: false,
        right: true,
        bottom: true,
        left: true,
        transition: 'slide-y-reverse-transition',
        fab:false,
        tabs:null,
        hover:false,
        selectedTab: null,
        adminstrator:null,
        snackbar: false,
        y: 'bottom',
        x: null,
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar',
        color:'green',
        snackbarText:'Created Adminstrator Successfully'

      }
    },
    computed:{
      fetchProfileImage(){
        return this.$store.state.profileImageUrl;
      },
      success(){
        return this.$store.state.successAddingAdminstrator;
      }
    },
    mounted(){
      this.$store.dispatch('onUnSetAddingAdminstrator');
    }
  }
</script>
