import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

// Define TypeScript interface for support items
interface SupportItem {
    id: number;
    type: 'Location' | 'Email' | 'Get in Touch';
    title: string;
    description: string;
}

const Support: React.FC = () => {
    const [data, setData] = useState<SupportItem[]>([
        { id: 1, type: 'Location', title: 'Our Location', description: 'Al. Brucknera 63, Wroclaw' },
        { id: 2, type: 'Email', title: 'Email Us', description: 'john@example.com' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [editingItem, setEditingItem] = useState<SupportItem | null>(null);

    const [form] = Form.useForm();

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
    const handleCreateOrUpdate = () => {
        form.validateFields().then((values) => {
            const newItem: SupportItem = {
                id: editingItem ? editingItem.id : data.length + 1,
                ...values,
            };
            if (editingItem) {
                setData(data.map((item) => (item.id === editingItem.id ? newItem : item)));
            } else {
                setData([...data, newItem]);
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    // Columns for the table with type annotations
    const columns: ColumnsType<SupportItem> = [
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
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
                footer={[
                    <Button
                        style={{
                            height: 42,
                        }}
                        key="cancel"
                        onClick={() => setIsModalVisible(false)}
                    >
                        Cancel
                    </Button>,
                    <Button
                        style={{
                            height: 42,
                        }}
                        key="submit"
                        type="primary"
                        onClick={handleCreateOrUpdate}
                    >
                        {editingItem ? 'Update Support' : 'Add Support'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
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
                </Form>
            </Modal>
        </div>
    );
};

export default Support;
