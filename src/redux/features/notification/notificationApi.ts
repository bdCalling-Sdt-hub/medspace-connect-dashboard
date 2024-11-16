import { baseApi } from '../../base/baseApi';

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getNotification: build.query({
            query: () => ({
                url: '/notification',
                method: 'GET',
            }),
            providesTags: ['Notification'],
            transformResponse: (response: any) => {
                const { notifications, unreadCount } = response.data;
                return { notifications, unreadCount };
            },
        }),

        readNotification: build.mutation({
            query: () => ({
                url: `/notification/read`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});

export const { useGetNotificationQuery, useReadNotificationMutation } = notificationApi;
