<template>
  <v-container grid-list-md fluid>
  <v-layout row>
    <v-flex xs12 sm6>
      <h2 class="secondary--text">Our Customers</h2>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
  export default{
    data(){
      return{
        search:'',
        headers:[
          {
            text:'uid',
            align:'left',
            sortable:true,
            value:'uid'
          },
          {text:'Email',value:'emailAddress'},
          {text:'Created On',value:'createdAt'},
          {text:'Last Signed In',value:'lastSignIn'}
        ]
      }
    },
    mounted(){
      this.$store.dispatch('onFetchCustomerList');
      console.log(this.$store.state.customers);
    }
  }
</script>
