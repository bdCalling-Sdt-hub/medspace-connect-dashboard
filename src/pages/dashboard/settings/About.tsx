import React, { useState } from 'react';
import { Table, Form, Input, Button, Modal, message, Upload, notification } from 'antd';
import { HiUpload } from 'react-icons/hi';
import TextArea from 'antd/es/input/TextArea';
import {
    useCreateAboutMutation,
    useGetAboutQuery,
    useUpdateAboutMutation,
} from '../../../redux/features/about/aboutApi';
import { imageUrl as baseImageUrl } from '../../../redux/base/baseApi';

// Define types for the About entry
interface AboutEntry {
    _id: number;
    title: string;
    description: string;
    image: string;
}

const About: React.FC = () => {
    const [createAbout] = useCreateAboutMutation();
    const [updateAbout] = useUpdateAboutMutation();
    const { data: aboutData } = useGetAboutQuery([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>(false);
    const [editingEntry, setEditingEntry] = useState<AboutEntry | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const openModal = (entry: AboutEntry | null) => {
        setEditingEntry(entry);
        setVisible(true);

        if (entry) {
            form.setFieldsValue({
                title: entry.title,
                description: entry.description,
            });

            // Use the backend URL for existing images
            setImageUrl(`${baseImageUrl}/${entry.image}`);
        } else {
            form.resetFields();
            setImageUrl(''); // Clear the image for new entries
        }
    };

    const onFinish = async (values: any) => {
        const { image, title, description } = values;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) {
            formData.append('aboutImage', image);
        }
        const updatedInfo = {
            data: formData,
            id: editingEntry?._id,
        };
        console.log(editingEntry);
        if (editingEntry) {
            try {
                const res = await updateAbout(updatedInfo).unwrap();

                if (res.success) {
                    notification.success({
                        message: 'Success',
                        description: res.message,
                        placement: 'topRight',
                    });
                    setVisible(false);
                    form.resetFields();
                    setImageUrl('');
                    return;
                }
            } catch (error: any) {
                notification.error({
                    message: 'Error',
                    description: error.data.message || 'Error occurred while creating about',
                    placement: 'topRight',
                });
            }
        }
        try {
            const res = await createAbout(formData).unwrap();

            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
                setVisible(false);
                form.resetFields();
                setImageUrl('');
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while creating about',
                placement: 'topRight',
            });
        }
    };

    const handleUpload = (info: any) => {
        const file = info.file.originFileObj || info.file;
        if (file && file.type && file.type.startsWith('image/')) {
            const imagePreviewUrl = URL.createObjectURL(file);
            setImageUrl(imagePreviewUrl); // For preview
            form.setFieldsValue({ image: file }); // Store the file object in the form
            message.success(`${file.name} selected successfully`);
        } else {
            message.error('Please select a valid image file (PNG, JPG, or JPEG)');
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => <span className="block max-w-[20ch] truncate">{description}</span>,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <img src={`${baseImageUrl}/${image}`} alt="About" style={{ width: 100, borderRadius: 5 }} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_text: any, entry: AboutEntry) => (
                <div>
                    <Button
                        type="link"
                        onClick={() => {
                            openModal(entry);
                        }}
                    >
                        Edit
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center my-5">
                <h3 className="text-3xl text-primary font-semibold">About</h3>
                <Button type="primary" onClick={() => openModal(null)} style={{ marginBottom: 20, height: 42 }}>
                    Add About
                </Button>
            </div>

            <Table columns={columns} dataSource={aboutData} pagination={false} />

            <Modal
                title={editingEntry ? 'Edit About' : 'Add About'}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                maskClosable={false}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the title for this section!' }]}
                    >
                        <Input
                            style={{
                                height: 42,
                            }}
                            placeholder="Enter a title (e.g., About Us, Our Mission)"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter the description for this section!' }]}
                    >
                        <TextArea
                            rows={6}
                            style={{
                                borderRadius: 10,
                            }}
                            placeholder="Enter a detailed description"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Image Upload"
                        name="image"
                        rules={
                            editingEntry
                                ? []
                                : [{ required: true, message: 'Please upload an image to represent this section!' }]
                        }
                    >
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
                                beforeUpload={() => false} // Prevent automatic upload
                                onChange={handleUpload}
                            >
                                <Button
                                    icon={<HiUpload />}
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

                    <Form.Item className="flex justify-end">
                        <Button
                            style={{
                                height: 42,
                            }}
                            type="primary"
                            htmlType="submit"
                        >
                            {editingEntry ? 'Update About' : 'Add About'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default About;
