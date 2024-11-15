import { Select } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGetDealsChartQuery } from '../../../redux/features/dasboard/deshboardApi';
import { useState } from 'react';
const { Option } = Select;

const EarningChart = () => {
    const [year, setYear] = useState('2024');
    const { data, isFetching } = useGetDealsChartQuery([{ name: 'year', value: year }]);
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
                <h1 className="text-2xl font-medium">Monthly Deals</h1>
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
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[5000, 25000]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="deals"
                        stroke="#79c2d0"
                        strokeWidth={2}
                        dot={{ fill: '#0A8FDC', stroke: '#0A8FDC', strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningChart;
