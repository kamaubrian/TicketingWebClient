<template>
  <v-layout>
    <v-container grid-list-md fluid>
      <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular indeterminate class="secondary--text"
                               :width="7"
                               :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>
       <v-layout row wrap v-else>
          <v-flex xs12>
            <v-card class="elevation-3">
              <v-card-title>
                <h4 class="primary--text">Registered Students</h4>
                <v-spacer></v-spacer>
                <v-text-field
                  name="Search"
                  label="Search Student"
                  v-model="searchStudent"
                  append-icon="search"></v-text-field>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-data-table
                      :headers="headers"
                      :items="students"
                      :search="searchStudent">
                      <template slot="items" slot-scope="props">
                        <td>{{props.item.emailAddress}}</td>
                        <td class="text-xs-center">{{props.item.firstName}}</td>
                        <td class="text-xs-center">{{props.item.lastName}}</td>
                        <td class="text-xs-center">{{props.item.phoneNumber}}</td>
                        <td class="text-xs-center">{{props.item.timeStamp}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
       </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
  export default{
    data(){
      return{
       // loading:true
        searchStudent:'',
        headers:[
          {
            text:'Email',
            align:'left',
            sortable:true,
            value:'emailAddress'
          },
          {text:'First Name',value:'firstName'},
          {text:'Last Name',value:'lastName'},
          {text:'Phone Number',value:'phoneNumber'},
          {text:'Registration Date',value:'timeStamp'}
        ],
        students:[{
          emailAddress:'',
          firstName:'',
          lastName:'',
          phoneNumber:'',
          timeStamp:''
        }]
      }
    },
    computed:{
      loading(){
        return this.$store.getters.loading
      }
    },
    async mounted(){
      await this.$store.dispatch('onFetchAllStudents');
      this.students = await this.$store.getters.onGetStudents;
    }
  }
</script>
