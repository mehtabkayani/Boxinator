import axiosDefault from './axiosDefault';

//Adds authorization header to the axios call.
const axiosCall = () => {
    const instance = axiosDefault;

    let token = localStorage.getItem('token');
    
    instance.defaults.headers.common['Authorization'] = token;

    return instance;
}

export default axiosCall;

