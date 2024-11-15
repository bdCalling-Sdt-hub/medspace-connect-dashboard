import { baseApi } from '../../base/baseApi';

export const termsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTerms: build.query({
            query: () => ({
                url: '/info?name=TERMSANDCONDITIONS',
                method: 'GET',
            }),
            providesTags: ['Terms'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        addTerms: build.mutation({
            query: (data) => ({
                url: '/info/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Terms'],
        }),
        updateTerms: build.mutation({
            query: (args) => {
                return {
                    url: `/info/${args.id}`,
                    method: 'PATCH',
                    body: args.data,
                };
            },
            invalidatesTags: ['Terms'],
        }),
    }),
});

export const { useGetTermsQuery, useAddTermsMutation, useUpdateTermsMutation } = termsApi;
