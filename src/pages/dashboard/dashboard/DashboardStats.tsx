import { HiCalendar, HiCurrencyDollar, HiMiniUserGroup } from 'react-icons/hi2';
import { useGetDashboardStatsQuery } from '../../../redux/features/dasboard/deshboardApi';

const DashboardStats = () => {
    const { data: dashboardData } = useGetDashboardStatsQuery([]);

    const data = [
        {
            name: 'Total Seeker',
            count: dashboardData?.totalSeeker,
            icon: <HiMiniUserGroup color="#0A8FDC" size={24} />,
            bgColor: '#fff',
        },
        {
            name: 'Total Provider',
            count: dashboardData?.totalProvider,
            icon: <HiCalendar color="#0A8FDC" size={24} />,

            bgColor: '#fff',
        },
        {
            name: 'Total Interests',
            count: dashboardData?.totalDeals,
            icon: <HiCurrencyDollar color="#0A8FDC" size={24} />,

            bgColor: '#fff',
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-3 gap-3 items-center">
                {data.map((item, index) => (
                    <div key={index} className="bg-[#0A8FDC] rounded-md p-10 border flex items-center gap-3">
                        <div className={`bg-white w-[44px] h-[44px] rounded-full flex items-center justify-center`}>
                            {item?.icon}
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                            <p className="flex items-center justify-center text-lg text-white font-medium">
                                {item.name}
                            </p>
                            <div>
                                <p className="text-3xl font-bold">{item.count} +</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;
