import { baseApi } from '../../base/baseApi';

const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubscription: build.query({
            query: () => {
                return {
                    url: '/package/get-all',
                    method: 'GET',
                };
            },
            providesTags: ['Subscription'],
            transformResponse: (response: any) => response.data,
        }),
        createSubscription: build.mutation({
            query: (data) => {
                return {
                    url: '/package/create',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Subscription'],
        }),
        updateSubscription: build.mutation({
            query: (args) => {
                return {
                    url: `/package/update/${args.id}`,
                    method: 'PATCH',
                    body: args.data,
                };
            },
            invalidatesTags: ['Subscription'],
        }),
    }),
});

export const { useGetSubscriptionQuery, useCreateSubscriptionMutation, useUpdateSubscriptionMutation } =
    subscriptionApi;
