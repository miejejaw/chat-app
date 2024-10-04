import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Import the combined root reducer

export const store = configureStore({
    reducer: rootReducer,
});
