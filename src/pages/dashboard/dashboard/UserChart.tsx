import { Select } from 'antd';
import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
import { useGetUserChartQuery } from '../../../redux/features/dasboard/deshboardApi';
const { Option } = Select;

const UserChart = () => {
    const [year, setYear] = useState('2024');
    const { data, isFetching } = useGetUserChartQuery([{ name: 'year', value: year }]);
    if (isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
            }}
        >
            <div className="px-2 flex items-center justify-between">
                <h1 className="text-2xl font-medium">Total Users Statistics</h1>
                <Select onChange={(value) => setYear(value)} defaultValue="2024" className="w-32 h-[40px]">
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                    <Option value="2027">2027</Option>
                    <Option value="2028">2028</Option>
                    <Option value="2029">2029</Option>
                    <Option value="2030">2030</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="spaceseeker" fill="#79c2d0" />
                    <Bar dataKey="spaceprovider" fill="#0A8FDC" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserChart;
