import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, Table, Space, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
    useCreateSupportMutation,
    useGetSupportQuery,
    useUpdateSupportMutation,
} from '../../../redux/features/support/supportApi';

// Define TypeScript interface for support items
interface SupportItem {
    _id: number;
    type: 'Location' | 'Email' | 'Get in Touch';
    title: string;
    description: string;
}

const Support: React.FC = () => {
    const [createSupport] = useCreateSupportMutation();
    const [updateSupport] = useUpdateSupportMutation();
    const { data: supports } = useGetSupportQuery([]);

    const [data, setData] = useState<SupportItem[]>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editingItem, setEditingItem] = useState<SupportItem | null>(null);

    const [form] = Form.useForm();

    useEffect(() => {
        if (supports) {
            setData(supports);
        }
    }, [supports]);
    // Show modal for adding a new item
    const handleAdd = () => {
        setEditingItem(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    // Show modal for editing an item
    const handleEdit = (item: SupportItem) => {
        setEditingItem(item);
        form.setFieldsValue(item);
        setIsModalVisible(true);
    };

    // Create or update item
    const handleCreateOrUpdate = async (values: FormData) => {
        if (editingItem) {
            try {
                const res = await updateSupport({ id: editingItem._id, data: values }).unwrap();
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
                    description: error.data.message || 'Error occurred while updating support',
                    placement: 'topRight',
                });
            }
        } else {
            try {
                const res = await createSupport(values).unwrap();
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
                    description: error.data.message || 'Error occurred while creating support',
                    placement: 'topRight',
                });
            }
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    // Columns for the table with type annotations
    const columns: ColumnsType<SupportItem> = [
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => <span className="block max-w-[30ch] truncate">{description}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="">
            {/* Header and Add Button */}
            <div className="flex justify-between items-center my-5">
                <h3 className="text-3xl text-primary font-semibold">Help & Support Management</h3>
                <Button
                    style={{
                        height: 42,
                    }}
                    type="primary"
                    onClick={handleAdd}
                >
                    Add Support Item
                </Button>
            </div>

            <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />

            <Modal
                centered
                open={isModalVisible}
                title={editingItem ? 'Edit Support Item' : 'Add Support Item'}
                onCancel={() => setIsModalVisible(false)}
                footer={false}
            >
                <Form onFinish={handleCreateOrUpdate} form={form} layout="vertical">
                    <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select a type' }]}>
                        <Select style={{ height: 42 }}>
                            <Select.Option value="Location">Location</Select.Option>
                            <Select.Option value="Email">Email</Select.Option>
                            <Select.Option value="Get in Touch">Get in Touch</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
                        <Input style={{ height: 42 }} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <Input.TextArea style={{ height: 42 }} />
                    </Form.Item>
                    <Form.Item className="flex justify-end">
                        <Button
                            style={{
                                height: 42,
                            }}
                            htmlType="submit"
                            type="primary"
                        >
                            {editingItem ? 'Update Support' : 'Add Support'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Support;
