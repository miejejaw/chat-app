import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import friendReducer from '../features/friends/friendSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    friend: friendReducer,
});

export default rootReducer;
