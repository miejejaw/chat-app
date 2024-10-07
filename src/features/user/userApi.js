import axios from "axios";

const base_url = import.meta.env.VITE_BASE_API_URL;

export const registerUserApi = async (data) => {
    const response = await axios.post(`${base_url}/users/signup`, data);
    return response.data;
}