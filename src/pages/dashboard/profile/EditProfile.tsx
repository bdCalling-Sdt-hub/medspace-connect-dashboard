import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../redux/features/user/userApi';
import { imageUrl } from '../../../redux/base/baseApi';

interface FormValues {
    name: string;
    email: string;
    image: File | null;
}

const EditProfile: React.FC = () => {
    const [updateUser] = useUpdateProfileMutation();
    const { data } = useGetProfileQuery([]);
    const [imagePreview, setImagePreview] = useState<string>('/user.svg');
    const [form] = Form.useForm();
    console.log(data);
    useEffect(() => {
        if (data?.user) {
            // Set initial form values
            form.setFieldsValue({
                name: data.user.name,
                email: data.user.email,
            });

            // Set profile image preview
            setImagePreview(`${imageUrl}/${data.user.profile}`);
        }
    }, [data, form]);
    console.log(imagePreview);
    const onFinish = async (values: FormValues) => {
        try {
            const res = await updateUser(values).unwrap();

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

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const formData = new FormData();
            formData.append('profile', selectedFile);
            try {
                const res = await updateUser(formData).unwrap();

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
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <Form name="update_profile" layout="vertical" form={form} onFinish={onFinish}>
                {/* Banner Image */}
                <div className="flex justify-center">
                    <div className="w-[150px] h-[150px] relative">
                        <img
                            src={imagePreview}
                            alt="User Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <label
                            className="absolute bottom-[10%] cursor-pointer right-[5%] bg-primary rounded-full p-1 text-white"
                            htmlFor="imageUploadBanner"
                        >
                            <CiEdit size={25} />
                        </label>

                        <input
                            id="imageUploadBanner"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                </div>

                <Form.Item
                    label={
                        <label htmlFor="name" className="block text-primaryText mb-1 text-lg">
                            Full Name
                        </label>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="h-12" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                            Email
                        </label>
                    }
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="h-12" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        style={{
                            height: 42,
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;
