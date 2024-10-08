import axios from "axios";
import {headers} from "../auth/authApi.js";


const base_url = import.meta.env.VITE_BASE_API_URL;

export const fetchFriendsApi = async () => {
    const response = await axios.get(`${base_url}/messages/friends`, {headers});
    return response.data;
}