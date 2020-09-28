import axios from 'axios';

const instance = axios.create({baseURL: "http://localhost:8080/api"});
 let token = localStorage.getItem('token');

// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
instance.defaults.headers.common['Authorization'] = token;

export default instance;

