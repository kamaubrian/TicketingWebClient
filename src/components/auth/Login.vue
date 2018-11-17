<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-10 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img v-bind:src="fetchLogo" height="150" alt="MetroTrans Inc.">
              </div>
              <v-form>
                <v-text-field append-icon="person"
                v-model="email"
                name="email"
                label="Enter Email"
                type="email"
                required></v-text-field>
                <v-text-field
                v-model="password"
                append-icon="lock"
                name="password"
                label="Enter Password"
                type="password"
                required>
                </v-text-field>
              </v-form>
            </v-card-text>
                <div class="text-xs-center mt-3">
                  <v-btn :disabled="!isFormValid || isLoading"  @click="onClickToLogin" type="submit" class="primary">
                    LOGIN</v-btn>
                </div>
                <v-dialog
                hide-overlay
                v-model="dialog"
                persistent
                width="300">
                  <v-card
                    color="primarydark"
                    dark
                  >
                    <v-card-text>
                      Authenticating User.....
                      <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
            <div class="layout column align-center">
              <span class="caption mt-5">All Rights Reserved 2018 &copy; </span>
              <img v-bind:src="fetchLogo" height="50" alt="MetroTrans Inc." class="mt-3">
            </div>
          </v-card>
          <v-snackbar
            :timeout="8000"
            top
            right
            :color="color"
            v-model="snackbar"
            v-if="error ? snackbar = true : snackbar=false"
          >
            {{ snackbarText ? snackbarText = error: snackbarText }}
            <v-btn dark flat @click.native="snackbar = false" icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
  export default {
    data(){
      return{
        email:'',
        password:'',
        dialog:false,
        color:'red',
        snackbar :false,
        snackbarText:'Invalid Credentials'
      }
    },
    computed:{
      isFormValid(){
        return this.email !== '' && this.password!==''
      },
      isLoading(){
        return this.$store.getters.loading
      },
      error(){
        return this.$store.state.error;
      },
      user(){
        return this.$store.getters.user;
      },
      fetchLogo(){
        return '/static/logo/metrotrans_logo.png'
      }
    },
    methods:{
      async onClickToLogin(){
          try{
            this.dialog= true;
            const response = await this.$store.dispatch('onLoginAdminstrator',{emailAddress:this.email,authenticationPassword:this.password});
            this.$store.dispatch('setToken',response.data.token);
            this.dialog=false;
            this.$router.push('/home');
            console.log(response);
          }catch (e) {
            console.log(e.message);
            this.dialog=false;
          }
      },
      onDismissed(){
        this.$store.dispatch('clearErrors');
      }
    },
    mounted(){
        this.$store.dispatch('clearErrors');
        if(this.isUserAuthenticated){
          this.$router.push('/schedule')
        }else{
          this.$router.push('/');
        }
      },
    watch:{

    }
  }
</script>
