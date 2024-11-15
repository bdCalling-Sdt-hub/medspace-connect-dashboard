import { Button, Form, Input, notification } from 'antd';
import { useChangePasswordMutation } from '../../../redux/features/auth/authApi';

const ChangePassword = () => {
    const [changePassword] = useChangePasswordMutation();
    const onFinish = async (values: any) => {
        try {
            const res = await changePassword(values).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while updating profile',
                placement: 'topRight',
            });
        }
    };
    return (
        <div className="max-w-lg mx-auto">
            <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item
                    label={
                        <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                            Current Password
                        </label>
                    }
                    name="currentPassword"
                    rules={[{ required: true, message: 'Please input new password!' }]}
                >
                    <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                </Form.Item>
                <Form.Item
                    label={
                        <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                            New Password
                        </label>
                    }
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input confirm password!' }]}
                >
                    <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                </Form.Item>
                <Form.Item
                    label={
                        <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                            Confirm Password
                        </label>
                    }
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please input confirm password!' }]}
                >
                    <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        style={{
                            height: 45,
                            width: '100%',
                            fontWeight: 500,
                        }}
                    >
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
