import { TApiResponse, TQueryParams } from '../../../types';
import { baseApi } from '../../base/baseApi';
export interface TDashboardStats {
    totalProvider: number;
    totalSeeker: number;
    totalDeals: number;
}

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboardStats: build.query({
            query: () => {
                return {
                    url: '/space/status',
                    method: 'GET',
                };
            },
            transformResponse: (response: TApiResponse<TDashboardStats>) => response.data,
        }),
        getDealsChart: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => params.append(item.name, item.value as string));
                }
                return {
                    url: '/conversation/monthly-status',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponse<any>) => response.data,
        }),
        getUserChart: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => params.append(item.name, item.value as string));
                }
                return {
                    url: '/user/user-statistic',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponse<any>) => response.data,
        }),
    }),
});

export const { useGetDashboardStatsQuery, useGetDealsChartQuery, useGetUserChartQuery } = dashboardApi;
