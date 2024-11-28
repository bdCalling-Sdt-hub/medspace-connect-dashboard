import { baseApi } from '../../base/baseApi';

const couponApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createCoupon: build.mutation({
            query: (data) => {
                return {
                    url: '/coupon/create',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Coupon'],
        }),
        deleteCoupon: build.mutation({
            query: (id) => {
                return {
                    url: `/coupon/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Coupon'],
        }),
        getCoupons: build.query({
            query: () => {
                return {
                    url: '/coupon',
                    method: 'GET',
                };
            },
            providesTags: ['Coupon'],
            transformResponse: (response: any) => response.data,
        }),
    }),
});

export const { useCreateCouponMutation, useDeleteCouponMutation, useGetCouponsQuery } = couponApi;
