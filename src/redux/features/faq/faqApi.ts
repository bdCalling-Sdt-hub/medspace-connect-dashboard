import { TApiResponse } from '../../../types';
import { baseApi } from '../../base/baseApi';
type TFaq = {
    _id: string | number;
    question: string;
    answer: string;
};
export const faqApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFaq: build.query({
            query: () => ({
                url: '/faq',
                method: 'GET',
            }),
            providesTags: ['Faq'],
            transformResponse: (response: TApiResponse<TFaq[]>) => {
                return response.data;
            },
        }),
        addFaq: build.mutation({
            query: (data) => ({
                url: '/faq/create',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Faq'],
        }),
        updateFaq: build.mutation({
            query: (args) => {
                return {
                    url: `/faq/${args.id}`,
                    method: 'PATCH',
                    body: args.data,
                };
            },
            invalidatesTags: ['Faq'],
        }),
        deleteFaq: build.mutation({
            query: (id) => {
                return {
                    url: `/faq/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Faq'],
        }),
    }),
});

export const { useGetFaqQuery, useAddFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } = faqApi;
