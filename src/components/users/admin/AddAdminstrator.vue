<template>
  <v-layout row justify-end>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn slot="activator" class="green" flat dark fab small>
        <v-icon>add</v-icon>
      </v-btn>
      <v-toolbar dark color="primarydark">
        <v-btn icon dark @click.native="dialog=false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Administrator</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="dialog=false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>Add Administrator
        <v-spacer></v-spacer>
          <v-avatar size="40px">
            <img src="/static/profile/man_profile.png" alt="admin"/>
          </v-avatar>
          <v-btn class="primarydark" flat dark small>
            <v-icon left dark>cloud_upload</v-icon>
            Upload Profile Image
          </v-btn>

        </v-subheader>

        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>
              <v-text-field
                v-model="firstName"
              append-icon="person"
              name="password"
              label="Enter First Name"
              type="text"
              required></v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>
              <v-text-field
                v-model="lastName"
                append-icon="person"
                name="lastName"
                label="Enter Last Name"
                type="text"
                required></v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list three-line subheader>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>
              <v-text-field
                v-model="emailAddress"
                append-icon="mail"
                name="emailAddress"
                label="Enter Email Address"
                type="email"
                required></v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>
              <v-text-field
                v-model="phoneNumber"
                append-icon="phone"
                name="phoneNumber"
                label="Enter Phone Number"
                type="number"
                required></v-text-field>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-sub-title>
              <v-select
                :items="roleTypes"
              v-model="role"
              label="Select Role Type"
              auto
              required
              item-text="name"
              item-value="id"></v-select>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default{
    data(){
      return{
        dialog:false,
        firstName:'',
        lastName:'',
        emailAddress:'',
        phoneNumber:'',
        role:'',
        roleTypes:[
          {
            id:1,
            name:'System Adminstrator'
          },
          {
            id:2,
            name:'Database Adminstrator'
          },
          {
            id:3,
            name:'System Maintainer'
          },
          {
            id:4,
            name:'Conductor'
          }
        ]
      }
    }
  }
</script>
