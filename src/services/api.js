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
      default:
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/user'
        });
    }
};
