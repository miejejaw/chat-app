import {fetchFriendsApi} from "./friendApi.js";
import { friendActions } from './friendSlice.js';


export const fetchFriends = (userId) => async (dispatch) => {
    try {
        const response = await fetchFriendsApi(userId);
        const data = transformFriendsList(response);
        dispatch(friendActions.setFriends(data));
    } catch (error) {
        console.error("Error fetching friends data: ", error);
    }
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