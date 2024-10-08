import { setUserProfile, clearUserProfile } from './userSlice';
import {getUserProfileApi} from './userApi';

// Thunk for fetching user profile
export const fetchUserProfile = () => async (dispatch) => {
    try {
        const profile = await getUserProfileApi(); // Fetch profile API call
        dispatch(setUserProfile(profile));
    } catch (err) {
        console.error('Failed to fetch user profile:', err);
        dispatch(clearUserProfile()); // Optionally clear profile on error
    }
};
