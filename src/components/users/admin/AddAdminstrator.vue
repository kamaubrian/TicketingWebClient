<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" class="green" dark flat fab small>
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Administrator</span>
          <v-spacer></v-spacer>
          <v-avatar size="40px">
            <img src="/static/profile/man_profile.png" alt="admin"/>
          </v-avatar>
          <v-btn class="primarydark" flat dark small>
            <v-icon left dark>cloud_upload</v-icon>
            Upload Profile Image
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Enter First Name" required v-model="firstName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Enter Last Name" v-model="lastName"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter Email Address" required v-model="emailAddress"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter PhoneNumber" required v-model="phoneNumber"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Enter Password" type="password" required v-model="authenticationPassword"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
        <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>

      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      firstName:'',
      lastName:'',
      emailAddress:'',
      phoneNumber:'',
      authenticationPassword:''
    }),
    computed:{
      loading(){
        return this.$store.state.loading;
      }
    }
  }
</script>
