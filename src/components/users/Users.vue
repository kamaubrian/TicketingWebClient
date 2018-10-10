<template>
  <v-container grid-list-md fluid>

  </v-container>
</template>
<script>
  export default{
    mounted(){
      this.$store.dispatch('onFetchCustomerList');
      console.log(this.$store.state.customers);
    }
  }
</script>
