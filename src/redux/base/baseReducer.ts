import { baseApi } from '../base/baseApi';
import authReducer from '../features/auth/authSlice';
import notificationReducer from '../features/notification/notificationSlice';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistAuthConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const baseReducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    notification: notificationReducer,
};
