import { baseApi } from '../../base/baseApi';

export const practiceTypeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPracticeType: build.query({
            query: () => ({
                url: '/practicetype',
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        createPracticeType: build.mutation({
            query: (data) => ({
                url: '/practicetype/create',
                method: 'POST',
                body: data,
            }),
        }),

        deletePracticeType: build.mutation({
            query: (id) => ({
                url: `/practicetype/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetPracticeTypeQuery, useCreatePracticeTypeMutation, useDeletePracticeTypeMutation } =
    practiceTypeApi;
