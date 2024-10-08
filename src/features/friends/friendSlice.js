import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    friends: {},
    searchResults: {},
    messages: {}
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

            if (state.friends[id]) {
                state.friends[id].last_message.content = message.message;
                state.friends[id].last_message.time = message.time;
                state.friends[id].unread_count += 1;
            }else{
                state.friends[id] = {
                    profile: state.searchResults[id].profile,
                    last_message: {
                        content: message.message,
                        time: message.time,
                    },
                    last_seen: state.searchResults[id].last_seen,
                    unread_count: 1,
                }

                state.messages[id] = [];
            }

            if(message.is_self){
                state.friends[id].unread_count = 0;
            }
        },
        clearFriends: (state) => {
            state.friends = {};
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        clearSearchResults: (state) => {
            state.searchResults = {};
        },
        setMessages: (state, action) => {
            const {friendId, messages} = action.payload;
            state.messages[friendId] = messages || [];
        },
        addMessage: (state, action) => {
            const message = action.payload;
            const friendId = message.is_self ? message.receiver_id : message.sender.id;
            state.messages[friendId] = [message, ...state.messages[friendId]]
        },
    },
});

export const friendActions = friendSlice.actions;
export default friendSlice.reducer;
