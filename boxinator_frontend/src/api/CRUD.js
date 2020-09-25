import instance from '../configs/axiosConfig';
import axiosDefault from '../configs/axiosDefault';

export const CREATE = async (endpoint, object) => await instance.post(endpoint, object);

export const READ = async (endpoint, object) => await instance.get(endpoint, object);

export const UPDATE = async (endpoint, object) => await instance.put(endpoint, object);

export const DELETE = async (endpoint, object) => await instance.delete(endpoint, object);

export const READDEFAULT = async (endpoint, object) => await axiosDefault(endpoint, object);

export const UPDATELOGIN = async (endpoint, object , code) => {
    await axiosDefault(endpoint, object, {headers: {'Authorization': code}});
}

