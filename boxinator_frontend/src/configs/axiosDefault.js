import axios from 'axios';

const axiosDefault = axios.create({baseURL: "http://localhost:8080/api"});
// http://localhost:8080/api
//https://stark-stream-85754.herokuapp.com/api
export default axiosDefault;