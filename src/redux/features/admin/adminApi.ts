import { baseApi } from '../../base/baseApi';

export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAdmin: build.query({
            query: () => ({
                url: '/user/all-users/admin',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['Admin'],
        }),
        addAdmin: build.mutation({
            query: (data) => ({
                url: '/admin/add',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Admin'],
        }),
        deleteAdmin: build.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admin'],
        }),
    }),
});

export const { useGetAdminQuery, useAddAdminMutation, useDeleteAdminMutation } = adminApi;
