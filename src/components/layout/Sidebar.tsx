import { ConfigProvider, Layout, Menu, Modal } from 'antd';
import { sidebarItemsGenerator } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { removeUser } from '../../redux/features/auth/authSlice';

const { Sider } = Layout;
const Sidebar = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        Modal.confirm({
            title: 'Confirm Logout',
            content: 'Are you sure you want to log out?',
            okText: 'Yes',
            cancelText: 'No',
            centered: true,
            onOk: () => {
                dispatch(removeUser());
            },
        });
    };

    const menuItems = sidebarItemsGenerator(sidebarItems, handleLogout);
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: '#414446',
                    colorPrimary: '#0A8FDC',
                },
                components: {
                    Menu: {
                        itemSelectedBg: '#0A8FDC',
                        itemSelectedColor: 'white',
                        itemBorderRadius: '30px 0px 0px 30px' as any,
                    },
                },
            }}
        >
            <Sider width={250} theme="light" breakpoint="lg" collapsedWidth="0">
                <Link to="/">
                    <div
                        style={{
                            margin: '0 20px',
                            padding: '20px 0',
                        }}
                    >
                        <img src="/logo.svg" alt="" />
                    </div>
                </Link>

                <Menu theme="light" mode="inline" defaultSelectedKeys={['dashboard']} items={menuItems} />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
