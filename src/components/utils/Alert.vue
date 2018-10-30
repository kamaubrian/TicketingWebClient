<template>
  <v-alert error dismissible @input="onClose":value="true" transition="scale-transition" outline>
    {{text}}
  </v-alert>
</template>
<script>
  export default{
    props:['text'],
    methods:{
      onClose(){
        this.$emit('dismissed');
      }
    }
  }
</script>
