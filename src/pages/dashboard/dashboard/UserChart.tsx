import { Select } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
const { Option } = Select;
const UserChart = () => {
    interface UserData {
        month: string;
        spaceSeeker: number;
        spaceProvider: number;
        newUsers: number; // Example for the secondary bar
    }

    const data: UserData[] = [
        { month: 'February', spaceProvider: 80, spaceSeeker: 40, newUsers: 30 },
        { month: 'March', spaceProvider: 130, spaceSeeker: 70, newUsers: 45 },
        { month: 'April', spaceProvider: 90, spaceSeeker: 60, newUsers: 40 },
        { month: 'May', spaceProvider: 140, spaceSeeker: 80, newUsers: 50 },
        { month: 'June', spaceProvider: 110, spaceSeeker: 70, newUsers: 35 },
        { month: 'July', spaceProvider: 180, spaceSeeker: 120, newUsers: 70 },
        { month: 'August', spaceProvider: 150, spaceSeeker: 100, newUsers: 60 },
        { month: 'September', spaceProvider: 170, spaceSeeker: 100, newUsers: 80 },
        { month: 'October', spaceProvider: 190, spaceSeeker: 130, newUsers: 90 },
        { month: 'November', spaceProvider: 160, spaceSeeker: 120, newUsers: 75 },
        { month: 'December', spaceProvider: 200, spaceSeeker: 150, newUsers: 100 },
    ];

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
                <Select defaultValue="2024" className="w-32 h-[40px]">
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
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="spaceSeeker" fill="#79c2d0" />
                    <Bar dataKey="spaceProvider" fill="#0A8FDC" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserChart;
