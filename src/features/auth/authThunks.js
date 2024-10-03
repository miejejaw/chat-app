import { loginSuccess, refreshTokenSuccess, logout } from './authSlice';
import { loginApi, refreshApi } from './authApi';
import {setUserProfile} from "../user/userSlice.js";

export const login = (username, password) => async (dispatch) => {
    try {
        const response = await loginApi(username, password);
        const { access_token, refresh_token, user } = response.data;

        dispatch(loginSuccess({ access_token, refresh_token }));
        dispatch(setUserProfile(user));

    } catch (err) {
        console.error('Login failed:', err);
        // Optionally, dispatch a failure action here
    }
};

export const refreshAccessToken = () => async (dispatch, getState) => {
    const { refreshToken } = getState().auth;

    try {
        const { token } = await refreshApi(refreshToken);
        dispatch(refreshTokenSuccess({ token }));
        return token;
    } catch (err) {
        console.error('Token refresh failed:', err);
        dispatch(logout()); // Log out the user if token refresh fails
    }
};
