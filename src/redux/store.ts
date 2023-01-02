import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alertReducer';
import petReducer from './reducers/petReducer';

import userReducer from './reducers/userReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        pet: petReducer,
        alert:alertReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;