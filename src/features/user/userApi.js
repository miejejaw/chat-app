import axios from "axios";
import {headers} from "../auth/authApi.js";


const base_url = import.meta.env.VITE_BASE_API_URL;

export const registerUserApi = async (data) => {
    const response = await axios.post(`${base_url}/users/signup`, data);
    return response.data;
}

export const searchUserApi = async (search) => {
    const response = await axios.get(`${base_url}/users/search?search=${search}`, {headers});
    return transformFriendsList(response.data);
}

// Transform the friends list data
const transformFriendsList = (friends) => {
    if (!friends) return {};

    const result = {};
    friends.forEach(item => {
        const friendId = item.profile.id;
        result[friendId] = item;
    });
    return result;
};