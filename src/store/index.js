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
      },
      setLoadedSchedules(state,payload){
        state.loadedSchedules=payload;
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
      loadSchedule({commit}){
        commit('setLoading',true);
        firebase.database().ref('Schedule').once('value')
          .then(data=>{
            const schedules =[];
            const objects = data.val();
            for(let key in objects){
              schedules.push({
                  id:key,
                  departureLocation:objects[key].departureLocation,
                  arrivalDestination:objects[key].arrivalDestination,
                  timeTaken:objects[key].timeTaken,
                  routeTaken:objects[key].routeTaken,
                  pricePerTrip:objects[key].pricePerTrip,
                  departureTime:objects[key].departureTime
              });
            }
            console.log(schedules);
            commit('setLoading',false);
            commit('setLoadedSchedules',schedules);
          })
          .catch((error)=>{
              commit('setLoading',false);
              commit('setError',error);
              console.log(error);
          });
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
      },
    loadedSchedules(state){
        return state.loadedSchedules;
    }
  }

});
