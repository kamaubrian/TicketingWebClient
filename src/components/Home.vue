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

      </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12 sm4>
      <v-card>
        <v-card-title>
          <h3>Home Page</h3>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12 sm4>
      <v-card>
        <v-card-title>
          <h3>Home Page</h3>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>
