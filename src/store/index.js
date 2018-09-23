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
      },
      setLoading(state,payload){
        state.loading = payload;
      },
      setError(state,payload){
        state.error=payload;
      },
      clearError(state,payload){
        state.error = null;
      }
  },
  actions:{
      onCreateSchedule({commit,getters},payload){
        commit('setLoading',true);
        commit('clearError');
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
            commit('setLoading',false);
          })
          .catch((error)=>{
            console.log(error);
            commit('setLoading',false);
            commit('setError',error);
          })

      },
      clearErrors({commit}){
        commit('clearError');
      }
  },
  getters:{
      error(state){
        return state.error;
      },
      loading(state){
        return state.loading;
      }
  }

});
