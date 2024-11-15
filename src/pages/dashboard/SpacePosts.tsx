import { Table } from 'antd';
import { useState } from 'react';
import { useGetAllSpaceQuery } from '../../redux/features/space/spaceApi';
import moment from 'moment';

const SpacePost = () => {
    const [page, setPage] = useState(1);
    const { data: spaceData } = useGetAllSpaceQuery([{ name: 'page', value: page }]);
    const columns = [
        {
            title: 'Post ID',
            dataIndex: 'postId',
            key: 'postId',
            render: (_text: string, _record: any, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Provider Name',
            dataIndex: 'providerId',
            key: 'providerId',
            render: (provider: any) => <span>{provider?.name}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => <span className="block max-w-[20ch] truncate">{description}</span>,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: string) => <span className="font-bold">${text}</span>,
        },
        {
            title: 'Practice Type',
            dataIndex: 'practiceFor',
            key: 'practiceType',
            render: (text: string) => <span className="capitalize">{text}</span>,
        },
        {
            title: 'Date Created',
            dataIndex: 'createdAt',
            key: 'dateCreated',
            render: (text: string) => <p>{moment(text).format('MM/DD/YYYY')}</p>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <span
                    className={`inline-block px-2 py-1 rounded-full ${
                        text === 'ACTIVE' ? 'bg-primary text-white' : 'bg-red-500 text-white'
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
                pageSize: spaceData?.pagination?.limit,
                onChange: (newPage) => setPage(newPage),
                total: spaceData?.pagination?.total,
            }}
            columns={columns}
            dataSource={spaceData?.data}
        />
    );
};

export default SpacePost;
