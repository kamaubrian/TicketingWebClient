<template>
  <v-layout>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
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
                    label="Route Number"
                    append-icon="format_list_numbered"
                    name="From"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs6>
                  <v-text-field
                    outline
                    label="Enter From"
                    append-icon="place"
                  name="From"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    outline
                    append-icon="place"
                    label="Enter Destination"
                    name="To"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                  outline
                  label="Enter Time Taken"
                  name="timeTaken"
                  append-icon="schedule"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    outline
                    label="Enter Route Taken"
                    name="routeTaken"
                  append-icon="compare_arrows"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                  outline
                  label="Enter Fare Price"
                  name="pricePerTrip"
                  append-icon="attach_money"></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    outline
                    label="Enter Departure Time"
                    name="departureTime"
                    append-icon="directions_bus"></v-text-field>
                </v-flex>
              </v-layout>
                <div class="text-xs-center mt-3">
                  <v-btn outline>Create Schedule</v-btn>
                </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title>
              <h4>Saved Bus Schedules</h4>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
  export default {
  }
</script>
