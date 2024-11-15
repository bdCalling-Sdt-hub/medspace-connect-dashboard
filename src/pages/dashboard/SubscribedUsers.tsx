import { Table } from 'antd';
import { useState } from 'react';
import { useGetAllSubscriberQuery } from '../../redux/features/user/userApi';
import moment from 'moment';

const SubscribedUsers = () => {
    const [page, setPage] = useState(1);
    const { data: subscribedUserData } = useGetAllSubscriberQuery([{ name: 'page', value: page }]);
    const columns = [
        {
            title: 'User ID',
            dataIndex: '_id',
            key: 'id',
            render: (_text: string, _record: any, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Subscription Plan',
            dataIndex: 'subscription',
            key: 'subscription',
            render: (subscription: any) => {
                return <p>{subscription.package.name}</p>;
            },
        },
        {
            title: 'Start Date',
            dataIndex: 'subscription',
            key: 'startDate',
            render: (subscription: any) => {
                return <p>{moment(subscription?.createdAt).format('MM/DD/YYYY')}</p>;
            },
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <span
                    className={`inline-block text-white px-2 py-1 rounded-full ${
                        text === 'active' ? 'bg-primary ' : 'bg-red-500 '
                    }`}
                >
                    {text}
                </span>
            ),
        },
    ];

    return (
        <Table
            pagination={{
                current: page,
                pageSize: subscribedUserData?.pagination?.limit,
                onChange: (newPage) => setPage(newPage),
                total: subscribedUserData?.pagination?.total,
            }}
            columns={columns}
            dataSource={subscribedUserData?.data}
        />
    );
};

export default SubscribedUsers;
