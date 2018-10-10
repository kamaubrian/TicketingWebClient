<template>
<v-container grid-list-md fluid>
  <v-layout row wrap>
    <v-flex xs12 sm4>
      <v-hover>
      <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12:2}`"
      class="mx-auto">
        <v-img
          :aspect-ratio="16/9"
          src="http://navigore.com/wp-content/uploads/2018/04/customer-life-cycle-navigore.jpg"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Our Clientele</h3>
            <div>
              Gives you Complete Control over Users
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" >Explore Users</v-btn>
        </v-card-actions>
      </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12 sm4>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12:2}`"
          class="mx-auto">
          <v-img
            :aspect-ratio="16/9"
            src="https://firebasestorage.googleapis.com/v0/b/metro-c7c33.appspot.com/o/imageedit_1_3918282855.png?alt=media&token=5b3c4ba5-2e10-4d54-a27d-17bedda8d4ac"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Bus Schedules</h3>
              <div>
                Easily Manage Bus Schedules
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" to="/schedule">Manage Bus Routes</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12 sm4>
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12:2}`"
          class="mx-auto">
          <v-img
            :aspect-ratio="16/9"
            src="https://www.tagetik.com/en/blog/images/2016-07-28-ssa-mantini"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">System Adminstrators</h3>
              <div>
                Manage System Adminstrators
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary">Manage System Admins.</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</v-container>
</template>
