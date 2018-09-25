import axios from 'axios';

export default(module) => {
    switch(module){
      case 'user':
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/user'
        });
      default:
        return axios.create({
          baseURL:'https://ticketingrestapi.herokuapp.com/api/v1/user'
        });
    }
};
