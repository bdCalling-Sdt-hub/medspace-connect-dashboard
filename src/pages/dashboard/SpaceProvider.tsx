import { Table } from 'antd';
import { useGetAllSpaceProviderQuery } from '../../redux/features/user/userApi';
import { useState } from 'react';

const SpaceProvider = () => {
    const [page, setPage] = useState(1);
    const { data: providerData } = useGetAllSpaceProviderQuery([{ name: 'page', value: page }]);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
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
            title: 'Occupation',
            dataIndex: 'occupation',
            key: 'occupation',
        },

        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
    ];

    return (
        <Table
            pagination={{
                current: page,
                pageSize: providerData?.pagination?.limit, // Number of records per page
                onChange: (newPage) => setPage(newPage),
                total: providerData?.pagination?.total, // Total number of records
            }}
            columns={columns}
            dataSource={providerData?.data}
        />
    );
};

export default SpaceProvider;
