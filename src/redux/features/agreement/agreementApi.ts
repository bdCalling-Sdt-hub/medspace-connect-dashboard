import { baseApi } from '../../base/baseApi';

export const agreementApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAgreement: build.query({
            query: () => ({
                url: '/info?name=USERAGRREEMENT',
                method: 'GET',
            }),
            providesTags: ['Agreement'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        addAgreement: build.mutation({
            query: (data) => ({
                url: '/info/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Agreement'],
        }),
        updateAgreement: build.mutation({
            query: (args) => {
                return {
                    url: `/info/${args.id}`,
                    method: 'PATCH',
                    body: args.data,
                };
            },
            invalidatesTags: ['Agreement'],
        }),
    }),
});

export const { useGetAgreementQuery, useAddAgreementMutation, useUpdateAgreementMutation } = agreementApi;
