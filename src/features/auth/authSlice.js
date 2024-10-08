import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    isAuthenticated: !!Cookies.get('accessToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
            state.isAuthenticated = true;

            // Store tokens in cookies
            Cookies.set('accessToken', action.payload.access_token, {expires: 7});
            Cookies.set('refreshToken', action.payload.refresh_token, { expires: 30 });
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            // Remove tokens from cookies
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        },
        refreshTokenSuccess: (state, action) => {
            state.accessToken = action.payload.token;
            Cookies.set('accessToken', action.payload.token, {expires: 7});
        },
    },
});

export const { loginSuccess, logout, refreshTokenSuccess } = authSlice.actions;
export default authSlice.reducer;
