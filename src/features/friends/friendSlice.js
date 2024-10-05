import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    friends: {},
};

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
        addFriend: (state, action) => {
            const { id, friendData } = action.payload;
            state.friends[id] = friendData;
        },
        removeFriend: (state, action) => {
            const { id } = action.payload;
            delete state.friends[id];
        },
        updateFriend: (state, action) => {
            const { id, updatedFriendData } = action.payload;
            if (state.friends[id]) {
                state.friends[id] = updatedFriendData;
            }
        },
        updateFriendLastMessage: (state, action) => {
            const message = action.payload;
            const id = message.is_self ? message.receiver_id : message.sender.id;

            console.log(message);
            if (state.friends[id]) {
                state.friends[id].last_message.content = message.message;
                state.friends[id].last_message.time = message.time;
                state.friends[id].unread_count += 1;
            }else{
                state.friends[id] = {
                    profile: {
                        id: message.sender.id,
                        first_name: message.sender.first_name,
                        last_name: message.sender.last_name,
                        profile_image_url: message.sender.profile_image_url,
                    },
                    last_message: {
                        content: message.message,
                        time: message.time,
                    },
                    unread_count: 1,
                }
            }

            if(message.is_self){
                state.friends[id].unread_count = 0;
            }
        },
        clearFriends: (state) => {
            state.friends = {};
        },
    },
});

export const friendActions = friendSlice.actions;
export default friendSlice.reducer;
