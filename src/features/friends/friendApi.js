import axios from "axios";


const base_url = import.meta.env.VITE_BASE_API_URL;

export const fetchFriendsApi = async (userId) => {
    const response = await axios.get(`${base_url}/messages/friends?user_id=${userId}`);
    return response.data;
}