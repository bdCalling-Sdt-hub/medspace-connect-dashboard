import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface AboutItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const About: React.FC = () => {
    const [data, setData] = useState<AboutItem[]>([
        {
            id: 1,
            title: 'Our Story',
            description:
                'Med Space Connect was born from a vision to bridge the gap between patients and healthcare providers. We believe that everyone deserves accessible, quality medical care. Our journey began with a simple goal: to create a community where healthcare is not just a service but a supportive experience. Today, we are dedicated to enhancing lives by connecting individuals with the resources they need to achieve well-being.',
            imageUrl: '/our-story.png',
        },
        {
            id: 2,
            title: 'Our Team',
            description:
                'Our team is a blend of passionate healthcare professionals, tech innovators, and dedicated support staff, all committed to advancing patient care through technology. From doctors and medical advisors to software engineers, every member of our team contributes to a shared mission: making healthcare accessible, reliable, and personalized. We work tirelessly to ensure Med Space Connect is a trusted platform for our users.',
            imageUrl: '/our-team.png',
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editingItem, setEditingItem] = useState<AboutItem | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [form] = Form.useForm();

    const handleEdit = (item: AboutItem) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setImageUrl(item.imageUrl);
        setIsModalVisible(true);
    };

    const handleCreateOrUpdate = () => {
        form.validateFields().then((values) => {
            const updatedItem: AboutItem = {
                ...editingItem,
                ...values,
                imageUrl,
            };
            setData(data.map((item) => (item.id === editingItem?.id ? updatedItem : item)));
            setIsModalVisible(false);
            form.resetFields();
            setImageUrl('');
        });
    };
    const handleUpload = (info: any) => {
        const file = info.file.originFileObj || info.file;

        if (file && file.type && file.type.startsWith('image/')) {
            const imagePreviewUrl = URL.createObjectURL(file);
            setImageUrl(imagePreviewUrl);
            message.success(`${file.name} selected successfully`);
        } else {
            message.error('Please select a valid image file (PNG, JPG, or JPEG)');
        }
    };

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
                        style={{ margin: 'auto' }}
                    >
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-[250px] object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-primary text-center">{item.title}</h2>
                        <p className="text-gray-600 text-center mb-4 line-clamp-2">{item.description}</p>
                        <Button style={{ height: 42, width: '100%' }} type="primary" onClick={() => handleEdit(item)}>
                            Edit {item.title}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Modal for Edit form */}
            <Modal
                width={500}
                centered
                open={isModalVisible}
                title={editingItem ? `Edit ${editingItem.title}` : 'Edit Section'}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" style={{ height: 42 }} onClick={() => setIsModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" style={{ height: 42 }} type="primary" onClick={handleCreateOrUpdate}>
                        Save
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                        <Input style={{ height: 42 }} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <Input.TextArea
                            style={{
                                padding: '10px 20px',
                                borderRadius: 10,
                            }}
                            rows={3}
                        />
                    </Form.Item>
                    <Form.Item label="Image Upload">
                        <div className="relative w-full flex justify-center items-center">
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full rounded shadow-lg"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <Upload
                                name="image"
                                listType="picture"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleUpload}
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    style={{
                                        height: 42,
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                >
                                    Select Image
                                </Button>
                            </Upload>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default About;
