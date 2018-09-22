import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
Vue.use(Vuex);

export const store = new Vuex.Store({

    state:{
      loadedSchedules:[
        {
          departureLocation: 'Daystar University',
          arrivalDestination: 'Nairobi',
          timeTaken: '2hrs',
          pricePerTrip: '150',
          routeTaken: 'via Mombasa Road',
          departureTime: '11:00am'
        }
      ],
      user:null,
      loading:false,
      error:null
    },

  mutations:{
      createSchedule(state,payload){
        state.loadedSchedules.push(payload);
      }
  },
  actions:{
      onCreateSchedule({commit,getters},payload){
        const schedule = {
          departureLocation: payload.departureLocation,
          arrivalDestination: payload.arrivalDestination,
          timeTaken: payload.timeTaken,
          routeTaken:payload.routeTaken,
          pricePerTrip: payload.pricePerTrip,
          departureTime: payload.departureTime
        };
        firebase.database().ref("Schedule").push(schedule)
          .then((data)=>{
            const key = data.key;
            console.log(data);
            commit('createSchedule',{...schedule,id:key})
          })
          .catch((error)=>{
            console.log(error);
          })

      }
  }

});
