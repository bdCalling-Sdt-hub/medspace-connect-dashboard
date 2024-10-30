import { ConfigProvider, Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const Sidebar = () => {
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

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={sidebarItemsGenerator(sidebarItems)}
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
