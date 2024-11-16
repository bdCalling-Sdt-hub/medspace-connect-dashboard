import moment from 'moment';
import { useAppSelector } from '../../redux/hooks';

const Notification = () => {
    const notificationData = useAppSelector((state) => state.notification);

    return (
        <div className="mt-5">
            <div className="bg-white p-5 rounded-xl shadow-lg">
                <div className="flex items-center justify-between my-4">
                    <h1 className="text-2xl font-semibold text-primary">Notification</h1>
                    {/* <Button className="h-10 bg-white text-primary font-normal text-sm border border-primary rounded-lg">
                        <span>Read all</span>
                    </Button> */}
                </div>
                <div>
                    {notificationData.notifications?.map((notification, index) => (
                        <div key={index} className="w-full mx-auto p-4 my-4 min-h-20 bg-white shadow-md rounded-md">
                            <div className="text-sm">
                                <div className="flex flex-col gap-5">
                                    <p className="font-semibold text-[#555555]">{notification.message}</p>
                                    <div className="flex justify-between items-center gap-5 text-[#A7A7A7]">
                                        <span className="text-xs">
                                            {moment(notification.createdAt).format('MMM DD, YYYY h:mm A')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;
