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
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title>
              <h4>Create Schedule</h4>
            </v-card-title>
            <v-card-text>
              <v-layout row>
                <v-flex xs6>
                  <v-text-field
                    outline
                    label="Enter From"
                    append-icon="place"
                  name="From"
                  v-model="departureLocation"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    outline
                    append-icon="place"
                    label="Enter Destination"
                    name="To"
                  v-model="arrivalDestination"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                  outline
                  label="Enter Time Taken"
                  name="timeTaken"
                  append-icon="schedule"
                  v-model="timeTaken"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    outline
                    label="Enter Route Taken"
                    name="routeTaken"
                  append-icon="compare_arrows"
                  v-model="routeTaken"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                  outline
                  label="Enter Fare Price"
                  name="pricePerTrip"
                  append-icon="attach_money"
                  v-model="pricePerTrip"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    outline
                    label="Enter Departure Time"
                    name="departureTime"
                    append-icon="directions_bus"
                  v-model="departureTime"></v-text-field>
                </v-flex>
              </v-layout>
                <div class="text-xs-center mt-3">
                  <v-btn @click="onCreateSchedule" outline :disabled="!formIsValid" type="submit">Create Schedule</v-btn>
                </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title>
              <h4>Saved Bus Schedules</h4>
              <v-spacer></v-spacer>
              <v-text-field
                name="Search"
                label="Search Schedule"
                v-model="search"
                append-icon="search"></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                    <v-data-table
                    :headers ="headers"
                    :items="schedules"
                    :search="search">
                     <template slot="items" slot-scope="props">
                        <td>{{props.item.arrivalDestination}}</td>
                       <td class="text-xs-right">{{ props.item.arrivalDestination }}</td>
                       <td class="text-xs-right">{{ props.item.timeTaken }}</td>
                       <td class="text-xs-right">{{ props.item.pricePerTrip }}</td>
                       <td class="text-xs-right">{{ props.item.departureTime }}</td>
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
  export default {
    data(){
      return {
        departureLocation:'',
        arrivalDestination:'',
        timeTaken:'',
        routeTaken:'',
        pricePerTrip:'',
        departureTime:'',
        search:'',
        headers:[
          {
            text:'From',
            align:'left',
            sortable:false,
            value:'departureLocation'
          },
          {text:'Destination',value:'arrivalDestination'},
          {text:'Duration',value:'timeTaken'},
          {text:'Price',value:'pricePerTrip'},
          {text:'Leaves At',value:'departureTime'}
        ],
        schedules:[
          {
            departureLocation:'',
            arrivalDestination:'',
            timeTaken:'',
            pricePerTrip:'',
            departureTime:'',
          }
        ]
      }
    },
    methods:{
        onCreateSchedule(){
          if(!this.formIsValid){
            return;
          }
          const scheduleData = {
            departureLocation: this.departureLocation,
            arrivalDestination: this.arrivalDestination,
            timeTaken: this.timeTaken,
            routeTaken: this.routeTaken,
            pricePerTrip: this.pricePerTrip,
            departureTime: this.departureTime
          };
          this.$store.dispatch('onCreateSchedule',scheduleData);
          this.$router.push('/');
        }
    },
    computed:{
        formIsValid(){
            return this.departureLocation !== '' && this.arrivalDestination!=='' && this.timeTaken!==''
                && this.routeTaken!=='' && this.pricePerTrip!=='' && this.departureTime!==''
        },
      loading(){
        return this.$store.getters.loading
      },


    },
    mounted(){
      this.$store.dispatch('loadSchedule');
      this.schedules = this.$store.state.loadedSchedules;
    }

  }
</script>
