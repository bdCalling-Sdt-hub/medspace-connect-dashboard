import { Table } from 'antd';

const SpaceSeeker = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
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
            dataIndex: 'address',
            key: 'address',
        },
    ];

    // Sample data
    const data = [
        {
            key: '1',
            id: '001',
            name: 'John Doe',
            email: 'john.doe@example.com',
            occupation: 'Software Developer',
            address: '123 Main St, Springfield, USA',
        },
        {
            key: '2',
            id: '002',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            occupation: 'Graphic Designer',
            address: '456 Oak St, Metropolis, USA',
        },
        {
            key: '3',
            id: '003',
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            occupation: 'Marketing Specialist',
            address: '789 Pine St, Gotham, USA',
        },
        {
            key: '4',
            id: '004',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            occupation: 'Data Scientist',
            address: '101 Maple St, Smallville, USA',
        },
        {
            key: '5',
            id: '005',
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            occupation: 'Product Manager',
            address: '202 Birch St, Star City, USA',
        },
        {
            key: '6',
            id: '006',
            name: 'Jessica Wilson',
            email: 'jessica.wilson@example.com',
            occupation: 'UX Designer',
            address: '303 Cedar St, Central City, USA',
        },
        {
            key: '7',
            id: '007',
            name: 'David Martinez',
            email: 'david.martinez@example.com',
            occupation: 'Sales Executive',
            address: '404 Elm St, Coast City, USA',
        },
        {
            key: '8',
            id: '008',
            name: 'Sarah Lee',
            email: 'sarah.lee@example.com',
            occupation: 'Business Analyst',
            address: '505 Walnut St, Blüdhaven, USA',
        },
        {
            key: '9',
            id: '009',
            name: 'James Anderson',
            email: 'james.anderson@example.com',
            occupation: 'IT Consultant',
            address: '606 Chestnut St, Keystone City, USA',
        },
        {
            key: '10',
            id: '010',
            name: 'Laura Thompson',
            email: 'laura.thompson@example.com',
            occupation: 'Content Writer',
            address: '707 Willow St, Fawcett City, USA',
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default SpaceSeeker;
