<template>
  <v-container grid-list-md fluid>

  </v-container>
</template>
<script>
  export default{
    mounted(){
      console.log(this.$store.state.customers);
    }
  }
</script>
