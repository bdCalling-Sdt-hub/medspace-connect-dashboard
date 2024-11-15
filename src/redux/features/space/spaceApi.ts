import { TApiResponse, TQueryParams } from '../../../types';
import { baseApi } from '../../base/baseApi';

const spaceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSpace: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => params.append(item.name, item.value as string));
                }
                return {
                    url: '/space',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponse<any[]>) => {
                return { data: response.data, pagination: response.pagination };
            },
        }),
        getAllDeals: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => params.append(item.name, item.value as string));
                }
                return {
                    url: '/space',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponse<any[]>) => {
                return { data: response.data, pagination: response.pagination };
            },
        }),
    }),
});

export const { useGetAllSpaceQuery } = spaceApi;
