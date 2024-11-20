import { baseApi } from '../../base/baseApi';

export const practiceNeedApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPracticeNeed: build.query({
            query: () => ({
                url: '/practiceneed',
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        createPracticeNeed: build.mutation({
            query: (data) => ({
                url: '/practiceneed/create',
                method: 'POST',
                body: data,
            }),
        }),

        deletePracticeNeed: build.mutation({
            query: (id) => ({
                url: `/practiceneed/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetPracticeNeedQuery, useCreatePracticeNeedMutation, useDeletePracticeNeedMutation } =
    practiceNeedApi;
