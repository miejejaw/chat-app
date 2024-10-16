import axios from 'axios';
import Cookies from "js-cookie";

const base_url = import.meta.env.VITE_BASE_API_URL;

export const loginApi = async (username, password) => {
    const response = await axios.post(`${base_url}/auth/login`, { username, password });
    return response.data;
};


export const refreshApi = async (refreshToken) => {
    const response = await axios.post(`${base_url}/auth/refresh`, { refreshToken });
    return response.data;
};

export const headers = {
    'Authorization': `Bearer ${Cookies.get('accessToken')}`
}