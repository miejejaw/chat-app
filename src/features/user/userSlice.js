import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const initialState = {
    profile: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.profile = action.payload;
            Cookies.set('user', JSON.stringify(action.payload), { expires: 7 });
        },
        clearUserProfile: (state) => {
            state.profile = null;
        },
    },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;