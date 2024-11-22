import { useEffect, useState } from 'react';
import {
    useCreatePracticeNeedMutation,
    useDeletePracticeNeedMutation,
    useGetPracticeNeedQuery,
} from '../../../redux/features/PracticeNeed/PracticeNeed';
import { Button, Form, Input, Modal, notification, Popconfirm, Table } from 'antd';
import { BsTrash } from 'react-icons/bs';

const PracticeNeed = () => {
    const [createPracticeNeed] = useCreatePracticeNeedMutation();
    const { data: practiceNeeds, refetch } = useGetPracticeNeedQuery([]);
    const [deletePracticeNeed] = useDeletePracticeNeedMutation();
    const [data, setData] = useState();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [form] = Form.useForm();

    useEffect(() => {
        if (practiceNeeds) {
            setData(practiceNeeds);
        }
    }, [practiceNeeds]);
    // Show modal for adding a new item
    const handleAdd = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deletePracticeNeed(id).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
            }
            refetch();
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while deleting admin',
                placement: 'topRight',
            });
        }
    };

    // Create or update item
    const handleCreateOrUpdate = async (values: FormData) => {
        try {
            const res = await createPracticeNeed(values).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
            }
            refetch();
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while creating support',
                placement: 'topRight',
            });
        }

        setIsModalVisible(false);
        form.resetFields();
    };

    // Columns for the table with type annotations
    const columns = [
        { title: 'S.No', dataIndex: 'id', key: 'id', render: (_: any, _record: any, index: number) => index + 1 },
        { title: 'Practice Need', dataIndex: 'need', key: 'need' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Popconfirm
                    onConfirm={() => handleDelete(record._id)}
                    title="Delete Practice Need"
                    description="Are you sure to delete this Practice Need?"
                >
                    <button>
                        <BsTrash className="text-red-600" size={20} />
                    </button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            {' '}
            <div>
                {' '}
                <div className="">
                    {/* Header and Add Button */}
                    <div className="flex justify-between items-center my-5">
                        <h3 className="text-3xl text-primary font-semibold">Practice Need</h3>
                        <Button
                            style={{
                                height: 42,
                            }}
                            type="primary"
                            onClick={handleAdd}
                        >
                            Add practice Need
                        </Button>
                    </div>

                    <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />

                    <Modal
                        centered
                        open={isModalVisible}
                        title="Add Practice Need"
                        onCancel={() => setIsModalVisible(false)}
                        footer={false}
                    >
                        <Form onFinish={handleCreateOrUpdate} form={form} layout="vertical">
                            <Form.Item
                                name="need"
                                label="Practice Need"
                                rules={[{ required: true, message: 'Please enter a Practice Need' }]}
                            >
                                <Input style={{ height: 42 }} />
                            </Form.Item>

                            <Form.Item className="flex justify-end">
                                <Button
                                    style={{
                                        height: 42,
                                    }}
                                    htmlType="submit"
                                    type="primary"
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>{' '}
            </div>
        </div>
    );
};

export default PracticeNeed;
