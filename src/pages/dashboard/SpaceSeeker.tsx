import { Table } from 'antd';
import { useState } from 'react';
import { useGetAllSpaceSeekerQuery } from '../../redux/features/user/userApi';

const SpaceSeeker = () => {
    const [page, setPage] = useState(1);
    const { data: providerData } = useGetAllSpaceSeekerQuery([{ name: 'page', value: page }]);
    const columns = [
        {
            title: 'ID',
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
            title: 'Occupation',
            dataIndex: 'occupation',
            key: 'occupation',
        },
        {
            title: 'Address',
            dataIndex: 'location',
            key: 'address',
        },
    ];

    return (
        <Table
            pagination={{
                current: page,
                pageSize: providerData?.pagination?.limit,
                onChange: (newPage) => setPage(newPage),
                total: providerData?.pagination?.total,
            }}
            columns={columns}
            dataSource={providerData?.data}
        />
    );
};

export default SpaceSeeker;
