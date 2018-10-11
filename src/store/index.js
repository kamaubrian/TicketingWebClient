import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import api from '../services/api';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export const store = new Vuex.Store({
    strict:true,
    plugins:[
      createPersistedState()
    ],
    state:{
      loadedSchedules:[{
        departureLocation:'',
        arrivalDestination:'',
        timeTaken:'',
        routeTaken:'',
        pricePerTrip:'',
        departureTime:'',
        departureLatitude:'',
        departureLongitude:'',
        arrivalLatitude:'',
        arrivalLongitude:'',
      }],
      payments:[{
        emailAddress:'',
        receiptNumber:'',
        transactionAmount:'',
        phoneNumber:'',
        fromLocation:'',
        destinationLocation:'',
        timeStamp:''
      }],
      user:null,
      loading:false,
      error:null,
      token:null,
      locationLatitude:null,
      locationLongitude:null,
      customers:[{
        uid:'',
        emailAddress:'',
        createdAt:'',
        lastSignIn:''
      }]
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
      onClearToken(state){
        state.token = null;
      },
      setLoadedSchedules(state,payload){
        state.loadedSchedules=payload;
      },
      setLoadedPayments(state,payload){
        state.payments=payload;
      },
      setToken(state,payload){
        state.token =payload;
      },
      setLatitude(state,payload){
        state.locationLatitude = payload;
      },
      setLongitude(state,payload){
        state.locationLongitude = payload;
      },
      setCustomers(state,payload){
        state.customers = payload;
    }
  },
  actions:{
      async onFetchCustomerList({commit}){
        let response;
        try{
          commit('clearError');
          commit('setLoading',true);
          response = await api('user').get('/auth/allUsers');
          commit('setCustomers',response.data.users);
          commit('setLoading',false);

        }catch (error) {
          commit('setError',error);
          commit('setLoading',false);
        }
      },

      async onLoginAdminstrator({commit},payload){
        let response;
          try{
            commit('setLoading',true);
            commit('clearError');
            response = await api('user').post('/auth/',payload);

            commit('setLoading',false);
            commit('setToken',response.data.token);
          }catch (e) {

            commit('setLoading',false);
            commit('setError','Incorrect Credentials');
          }
          return response;
      },
      async onFetchGeolocation({commit},payload){
        let response;
        try{
          commit('clearError');
          response = await api('maps').post('/',payload);
          commit('setLatitude',response.data.geoLocation.latitude);
          commit('setLongitude',response.data.geoLocation.longitude);
          //console.log('Latitude',response.data.geoLocation.latitude);
        }catch (e) {
          commit('setError',e.message);
        }
      },
      async onGetPayments({commit}){
        let response;
        try{
          commit('setLoading',true);
          commit('clearError');
          response = await api('payments').get('/allTransactions');
          console.log("This is the response",response);
          commit('setLoadedPayments',response.data.response.transactions);
          commit('setLoading',false);
        }catch (e) {
          commit('setError',e.message);
          commit('setLoading',false);
        }
      },
      onCreateSchedule({commit,getters},payload){
        commit('setLoading',true);
        commit('clearError');
        const schedule = {
          departureLocation: payload.departureLocation,
          arrivalDestination: payload.arrivalDestination,
          timeTaken: payload.timeTaken,
          routeTaken:payload.routeTaken,
          pricePerTrip: payload.pricePerTrip,
          departureTime: payload.departureTime,
          departureLatitude: payload.departureLatitude,
          departureLongitude: payload.departureLongitude,
          arrivalLatitude: payload.arrivalLatitude,
          arrivalLongitude: payload.arrivalLongitude
        };
        firebase.database().ref("Schedule").push(schedule)
          .then((data)=>{
            const key = data.key;
            commit('createSchedule',{...schedule,id:key});
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
            commit('setLoading',false);
            commit('setLoadedSchedules',schedules);
            //console.log(schedules);
          })
          .catch((error)=>{
              commit('setLoading',false);
              commit('setError',error);
              console.log(error);
          });
      },
      clearErrors({commit}){
        commit('clearError');
      },
      onLogout({commit}){
        commit('onClearToken');
      },
      setToken({commit},payload){
        commit('setToken',payload);
      }
  },
  getters:{
      user(state){
        return state.user;
      },
      error(state){
        return state.error;
      },
      loading(state){
        return state.loading;
      },
    loadedSchedules(state){
        return state.loadedSchedules;
    },
    getToken(state){
        return state.token
    },
    latitude(state){
        return state.locationLatitude;
    },
    longitude(state){
        return state.locationLongitude;
    },
    payments(state){
        return state.payments;
    },
    customers(state){
        return state.customers;
    }

  }
});
