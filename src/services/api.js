import axios from 'axios';
import {store} from '../store'
export default(module) => {
    switch(module){

      case 'user':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/user'
        });

      case 'user_v2':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v2/user'
        });

      case 'maps':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/maps'
        });

      case 'payments':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v2/callback/'
        });

      case 'admin':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/admin'
        });

      case 'bus':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v3/bus',
          headers:{
            Authorization:`Bearer ${store.state.token}`
          }
        });

      case 'student':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v3/student'
        });

      default:
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/docs'
        });
    }
};
