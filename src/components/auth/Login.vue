<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs8 sm6>
          <v-card class="elevation-12">
            <v-toolbar dark color="primarydark">
              <v-toolbar-title>Admin Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field append-icon="person"
                name="email"
                label="Enter Email"
                type="email"
                outline
                required></v-text-field>
                <v-text-field
                append-icon="lock"
                name="password"
                label="Enter Password"
                type="password"
                outline
                required>
                </v-text-field>
                <div class="text-xs-center mt-3">
                  <v-btn  outline type="submit">LOGIN</v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
  export default {
  }
</script>
