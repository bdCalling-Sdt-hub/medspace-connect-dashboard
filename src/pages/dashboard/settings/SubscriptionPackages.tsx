import React, { useState } from 'react';
import { Table, Form, Input, Button, Modal, Select, notification, Tooltip } from 'antd';
import {
    useCreateSubscriptionMutation,
    useGetSubscriptionQuery,
    useUpdateSubscriptionMutation,
} from '../../../redux/features/subcription/subscriptionApi';

// Define types for the package
interface SubscriptionPackage {
    _id: string;
    name: string;
    price: string;
    features: string[];
    allowedSpaces: number;
}

const { Option } = Select;

const SubscriptionPackages: React.FC = () => {
    const [createSubscription] = useCreateSubscriptionMutation();
    const [updateSubscription] = useUpdateSubscriptionMutation();
    const { data: subscriptions } = useGetSubscriptionQuery([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>(false);
    const [editingPackage, setEditingPackage] = useState<SubscriptionPackage | null>(null);

    const openModal = (pkg: SubscriptionPackage | null) => {
        setEditingPackage(pkg);
        setVisible(true);
        if (pkg) {
            form.setFieldsValue({
                packageName: pkg.name,
                price: pkg.price,
                features: pkg.features,
                allowedSpaces: pkg.allowedSpaces,
            });
        } else {
            form.resetFields();
        }
    };

    const onFinish = async (values: any) => {
        // If editing an existing package
        if (editingPackage) {
            const updatedInfo = {
                name: values.packageName.toUpperCase(),
                price: Number(values.price),
                features: values.features,
                allowedSpaces: Number(values.allowedSpaces),
            };

            // Update the subscription package
            try {
                const res = await updateSubscription({
                    data: updatedInfo,
                    id: editingPackage._id,
                }).unwrap();

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
                    description: error.data.message || 'Error occurred while updating package',
                    placement: 'topRight',
                });
            }
        } else {
            // Create new subscription package
            const newPackage = {
                name: values.packageName.toUpperCase(),
                price: Number(values.price),
                features: values.features,
                allowedSpaces: Number(values.allowedSpaces),
            };

            try {
                const res = await createSubscription(newPackage).unwrap();
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
                    description: error.data.message || 'Error occurred while creating package',
                    placement: 'topRight',
                });
            }
        }

        // Close the modal and reset form
        setVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Package Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Features',
            dataIndex: 'features',
            key: 'features',
            render: (features: string[]) => {
                const featureText = features.join(', ');
                const truncatedText = featureText.length > 100 ? featureText.substring(0, 100) + '...' : featureText;

                return (
                    <Tooltip title={featureText}>
                        <p
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '200px',
                            }}
                        >
                            {truncatedText}
                        </p>
                    </Tooltip>
                );
            },
        },
        {
            title: 'Allowed Spaces',
            key: 'allowedSpaces',
            dataIndex: 'allowedSpaces',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_text: any, pkg: SubscriptionPackage) => <Button onClick={() => openModal(pkg)}>Edit</Button>,
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center my-5">
                <h3 className="text-3xl text-primary font-semibold">Subscription Packages</h3>
                <Button type="primary" onClick={() => openModal(null)} style={{ marginBottom: 20, height: 42 }}>
                    Add Package
                </Button>
            </div>

            <Table columns={columns} dataSource={subscriptions} pagination={false} />

            <Modal
                title={editingPackage ? 'Edit Package' : 'Add Package'}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                maskClosable={false}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Package Name"
                        name="packageName"
                        rules={[{ required: true, message: 'Please enter package name!' }]}
                    >
                        <Input
                            style={{
                                height: 42,
                            }}
                            placeholder="Enter package name (e.g., Basic, Pro)"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Allowed Spaces"
                        name="allowedSpaces"
                        rules={[{ required: true, message: 'Please enter allowed spaces number!' }]}
                    >
                        <Input
                            style={{
                                height: 42,
                            }}
                            placeholder="Enter allowed spaces number"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter package price!' }]}
                    >
                        <Input
                            style={{
                                height: 42,
                            }}
                            placeholder="Enter package price"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Features"
                        name="features"
                        rules={[{ required: true, message: 'Please enter package features!' }]}
                    >
                        <Select
                            style={{
                                height: 42,
                                borderRadius: 100,
                                width: '100%',
                            }}
                            mode="tags"
                            placeholder="Select or create package features"
                            tokenSeparators={[',']}
                            maxTagCount={1}
                            maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length} more`}
                        >
                            <Option value="One space post">One space post</Option>
                            <Option value="Valid for as long as space is listed">
                                Valid for as long as space is listed
                            </Option>
                            <Option value="Priority Support">Priority Support</Option>
                            <Option value="Easy Listing Management">Easy Listing Management</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{
                                height: 42,
                            }}
                            type="primary"
                            htmlType="submit"
                        >
                            {editingPackage ? 'Update Package' : 'Add Package'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SubscriptionPackages;
