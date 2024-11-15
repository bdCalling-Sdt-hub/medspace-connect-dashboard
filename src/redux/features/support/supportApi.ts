import { baseApi } from '../../base/baseApi';

export const supportApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSupport: build.query({
            query: () => ({
                url: '/support-item',
                method: 'GET',
            }),
            providesTags: ['Support'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        createSupport: build.mutation({
            query: (data) => ({
                url: '/support-item',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Support'],
        }),
        updateSupport: build.mutation({
            query: (args) => {
                return {
                    url: `/support-item/${args.id}`,
                    method: 'PATCH',
                    body: args.data,
                };
            },
            invalidatesTags: ['Support'],
        }),
    }),
});

export const { useCreateSupportMutation, useGetSupportQuery, useUpdateSupportMutation } = supportApi;
