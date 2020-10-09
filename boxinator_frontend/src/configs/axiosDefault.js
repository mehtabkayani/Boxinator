import axios from 'axios';

const axiosDefault = axios.create({baseURL: "https://boxinator-backend-spring.herokuapp.com/api"});
// http://localhost:8080/api
//https://morning-hamlet-17278.herokuapp.com/api
//https://quiet-fortress-17098.herokuapp.com/
//https://boxinator-backend-spring.herokuapp.com
export default axiosDefault;