import { baseApi } from '../../base/baseApi';

export const aboutApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAbout: build.query({
            query: () => ({
                url: '/about',
                method: 'GET',
            }),
            providesTags: ['About'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        createAbout: build.mutation({
            query: (data) => ({
                url: '/about/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['About'],
        }),
        updateAbout: build.mutation({
            query: (args) => {
                return {
                    url: `/about/${args.id}`,
                    method: 'PATCH',
                    body: args.data,
                };
            },
            invalidatesTags: ['About'],
        }),
    }),
});

export const { useCreateAboutMutation, useGetAboutQuery, useUpdateAboutMutation } = aboutApi;
