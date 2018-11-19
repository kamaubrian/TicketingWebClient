<template>
<v-layout>
  <v-container grid-list-md fluid>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate class="primary--text"
                             :width="7"
                             :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>

      </v-flex>
    </v-layout>
  </v-container>
</v-layout>
</template>
<script>
  export default{
    data(){
      return{

      }
    }
  }
</script>
