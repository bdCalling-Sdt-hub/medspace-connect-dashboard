import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';
import PrivateRoute from './provider/PrivateRoute';
function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#0A8FDC',
                    },
                    components: {
                        Input: {
                            borderRadius: 40,
                        },
                        Select: {
                            borderRadius: 40,
                        },
                    },
                }}
            >
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            </ConfigProvider>
        </>
    );
}

export default App;
