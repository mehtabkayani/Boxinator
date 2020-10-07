import axios from 'axios';

const axiosDefault = axios.create({baseURL: "https://stark-stream-85754.herokuapp.com/api"});
// http://localhost:8080/api
//https://stark-stream-85754.herokuapp.com/api
export default axiosDefault;