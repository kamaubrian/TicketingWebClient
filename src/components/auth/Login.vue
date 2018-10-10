<template>
  <v-content>
    <v-container>
      <v-layout align-center justify-center v-if="error">
          <v-flex xs8 sm6>
            <app-alert @dismissed="onDismissed" :text="error"></app-alert>
          </v-flex>
      </v-layout>
      <v-layout align-center justify-center>
        <v-flex xs8 sm6>
          <v-card class="elevation-12">
            <v-toolbar dark color="primarydark">
              <v-toolbar-title>Admin Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field append-icon="person"
                v-model="email"
                name="email"
                label="Enter Email"
                type="email"
                outline
                required></v-text-field>
                <v-text-field
                v-model="password"
                append-icon="lock"
                name="password"
                label="Enter Password"
                type="password"
                outline
                required>
                </v-text-field>
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
            </v-card-text>
          </v-card>
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
        dialog:false
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
      }
    },
    methods:{
      async onClickToLogin(){
          try{
            this.dialog= true;
            const response = await this.$store.dispatch('onLoginAdminstrator',{email:this.email,password:this.password});
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
