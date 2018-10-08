import axios from 'axios';

export default(module) => {
    switch(module){
      case 'user':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/user'
        });

      case 'maps':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/maps'
        });
      case 'payments':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v2/callback/'
        });
      default:
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com'
        });
    }
};
