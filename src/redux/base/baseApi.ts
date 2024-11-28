import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.15:3000/api/v1',

        //Todo: http://192.168.10.15:3000/api/v1
        // https://api.medspaceconnect.com
        // http://195.35.6.13:5000

        credentials: 'include',
        prepareHeaders: (header, { getState }) => {
            const { token } = (getState() as RootState).auth;
            if (token) {
                header.set('Authorization', `Bearer ${token}`);
            }
        },
    }),
    endpoints: () => ({}),
    tagTypes: [
        'Auth',
        'Subscription',
        'Admin',
        'Terms',
        'Agreement',
        'About',
        'Support',
        'Faq',
        'Profile',
        'Notification',
    ],
});

export const imageUrl = 'http://192.168.10.15:3000';
