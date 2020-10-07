import axiosCall from '../configs/axiosConfig';
import axiosDefault from '../configs/axiosDefault';

export const POST = async (endpoint, object) => await axiosCall().post(endpoint, object);

export const GET = async (endpoint, object) => await axiosCall().get(endpoint, object);

export const PUT = async (endpoint, object) => await axiosCall().put(endpoint, object);

export const DELETE = async (endpoint, object) => await axiosCall().delete(endpoint, object);

export const GETDEFAULT = async (endpoint, object) => await axiosDefault.get(endpoint, object);

export const POSTLOGIN = async (endpoint, object, code) => {
    await axiosDefault.post(endpoint, object, { headers: {'Authorization': code}});
}
export const POSTLOGOUT = async (endpoint) => await axiosCall().post(endpoint);

export const POSTDEFAULT = async (endpoint, object) => await axiosDefault.post(endpoint, object);

