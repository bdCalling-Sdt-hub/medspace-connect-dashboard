import { TApiResponse, TQueryParams } from '../../../types';
import { baseApi } from '../../base/baseApi';
export interface Root {
    education?: Education;
    stripeAccountInfo?: StripeAccountInfo;
    _id: string;
    name: string;
    email: string;
    contact: string;
    banner: string;
    isSubscribed?: boolean;
    profile: string;
    status: string;
    __v: number;
    subscription?: {
        package: {
            name: string;
            price: string;
            allowedSpaces: number;
            createdAt: string;
        };
    };
    location: string;
    occupation: string;
}

export interface Education {
    degree: string;
    institutionName: string;
    institutionLocation: string;
    startYear: string;
    endYear: string;
}

export interface StripeAccountInfo {
    stripeCustomerId: string;
}

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSpaceProvider: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => params.append(item.name, item.value as string));
                }
                return {
                    url: '/user/all-users/spaceprovider',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponse<Root[]>) => {
                return { data: response.data, pagination: response.pagination };
            },
        }),
        getAllSpaceSeeker: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => params.append(item.name, item.value as string));
                }
                return {
                    url: '/user/all-users/spaceseeker',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponse<Root[]>) => {
                return { data: response.data, pagination: response.pagination };
            },
        }),
        getAllSubscriber: build.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => params.append(item.name, item.value as string));
                }
                return {
                    url: '/user/all-users/subscribed',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponse<Root[]>) => {
                return { data: response.data, pagination: response.pagination };
            },
        }),
    }),
});

export const { useGetAllSpaceProviderQuery, useGetAllSpaceSeekerQuery, useGetAllSubscriberQuery } = userApi;
