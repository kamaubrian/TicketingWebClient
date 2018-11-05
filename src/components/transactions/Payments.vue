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
        <v-card class="elevation-12">
          <v-card-title>
            <h4 class="primary--text">Paid Tickets(MPESA)</h4>
            <v-spacer></v-spacer>
            <v-text-field
            name="Search"
            label="Search Payment"
            v-model="search"
            @input="onTextDataChange"
            append-icon="search"></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-data-table
                :headers="headers"
                :items="payments"
                :search="search">
                  <template slot="items" slot-scope="props">
                    <td>{{props.item.emailAddress}}</td>
                    <td class="text-xs-center">{{props.item.receiptNumber}}</td>
                    <td class="text-xs-center">{{props.item.transactionAmount}}</td>
                    <td class="text-xs-center">{{props.item.phoneNumber}}</td>
                    <td class="text-xs-center">{{props.item.fromLocation}}</td>
                    <td class="text-xs-center">{{props.item.destinationLocation}}</td>
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
  import _ from 'lodash';
  export default {
    data(){
      return {
        search:'',
        isEditing:false,
        headers:[
          {
            text:'Email',
            align:'left',
            sortable:false,
            value:'emailAddress'
          },
          {text:'Mpesa-Code',value:'receiptNumber'},
          {text:'Amount',value:'transactionAmount'},
          {text:'Phone',value:'phoneNumber'},
          {text:'From',value:'fromLocation'},
          {text:'To',value:'destinationLocation'},
          {text:'Time',value:'timeStamp'}
        ],
        payments:[
          {
            emailAddress:'',
            receiptNumber:'',
            transactionAmount:'',
            phoneNumber:'',
            fromLocation:'',
            destinationLocation:'',
            timeStamp:''
          }
        ]
      }
    },
    mounted(){
      this.$store.dispatch('onFetchPaymentsFromFirebase');
      this.payments = this.$store.state.payments;
    },

    computed:{
      loading(){
        return this.$store.getters.loading
      }
    },
    watch:{
      search:_.debounce(async function(value){
        this.$store.dispatch('onTextDataChanged');
        this.payments = this.$store.state.payments;
      },1500)
    },
    methods:{
      onTextDataChange(){
        this.$store.dispatch('onTextDataChanged');
        this.payments = this.$store.state.payments;
      }
    }
  }
</script>
