import { Button, ConfigProvider, Form, FormProps, Input, notification } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation, useVerifyEmailMutation } from '../../redux/features/auth/authApi';
type TFormData = { otp: string };
const VerifyOtp = () => {
    const [verifyOtp] = useVerifyEmailMutation();
    const [forgetPassword] = useForgetPasswordMutation();
    const navigate = useNavigate();
    const onFinish: FormProps<TFormData>['onFinish'] = async (values) => {
        try {
            const email = localStorage.getItem('forgetEmail');
            const data = { email, oneTimeCode: Number(values.otp) };
            const res = await verifyOtp(data).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });

                navigate('/new-password');
                localStorage.setItem('oneTimeToken', res.data);
                localStorage.removeItem('forgetEmail');
            }
        } catch (error: any) {
            notification.error({
                message: error.data.message || 'Error occurred while verify Otp',

                placement: 'topRight',
            });
        }
    };
    const handleResendOtp = async () => {
        try {
            const email = localStorage.getItem('forgetEmail');
            const data = { email };
            const res = await forgetPassword(data).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
            }
        } catch (error: any) {
            notification.error({
                message: error.data.message || 'Error occurred while resend Otp',

                placement: 'topRight',
            });
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        // lineHeight: 3,
                        controlHeight: 50,

                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#0A8FDC',
                },
            }}
        >
            <div className="flex bg-[#1A4F73] items-center justify-center h-screen">
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Check your email</h1>
                        <p>
                            We sent a reset link to {localStorage.getItem('forgetEmail')} enter 5 digit code that
                            mentioned in the email
                        </p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto"
                            name="otp"
                            rules={[{ required: true, message: 'Please input otp code here!' }]}
                        >
                            <Input.OTP
                                style={{
                                    width: 300,
                                }}
                                className=""
                                variant="filled"
                                length={4}
                            />
                        </Form.Item>

                        <Form.Item>
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
                                Verify OTP Code
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="text-primaryText">Didn't receive the code?</p>
                            <button onClick={handleResendOtp} className="text-primary">
                                Resend code
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
