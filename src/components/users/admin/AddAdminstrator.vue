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
            <img src="/static/profile/man_profile.png" :src="profileImageUrl===''?fetchDefaultImage :profileImageUrl " alt="admin"/>
          </v-avatar>
          <v-btn class="primarydark" flat dark small @click.native="onPickFile">
            <v-icon left dark>cloud_upload</v-icon>
            Upload Profile Image
            <input type="file"
                   style="display: none;"
                   ref="fileInput"
                   accept="image/*"
                   @change="onFilePicked"
            />
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
          <v-btn color="blue darken-1" flat @click="dialog = false" >Close</v-btn>

          <v-btn color="blue darken-1" flat @click.native="onCreateAdmin":disabled="!validateForm">Save</v-btn>
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
      authenticationPassword:'',
      profileImageUrl:'',
      image:null,
      snackbar: false,
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 6000,
      text: 'Hello, I\'m a snackbar',
      color:'green',
      snackbarText:'Adminstrator Added Successfully'
    }),
    computed:{
      loading(){
        return this.$store.state.loading;
      },
      fetchDefaultImage(){
        return '/static/profile/man_profile.png'
      },
      validateForm(){
        return this.firstName!=='' && this.lastName!=='' && this.emailAddress !== '' && this.phoneNumber !==''
            && this.authenticationPassword !== '' && this.profileImageUrl !==''
      }
    },
    methods:{
      onPickFile(){
        this.$refs.fileInput.click();
      },
      onFilePicked(event){
        const files = event.target.files;
        let filename = files[0].name;
        if(filename.lastIndexOf('.')<=0){
          return alert('Enter Valid File, with Extension .jpg, .jpeg, .png');
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load',()=>{
          this.profileImageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      },
      async onCreateAdmin(){
        try {
          const adminData = {
            firstName: this.firstName,
            lastName: this.lastName,
            emailAddress: this.emailAddress,
            phoneNumber: this.phoneNumber,
            authenticationPassword: this.authenticationPassword,
            image: this.image,
          };
          const response = await this.$store.dispatch('onCreateAdminstrator', adminData);
          this.dialog = false;

        }catch (e) {
          console.log(e.message);
        }
      }
    },
  }
</script>
