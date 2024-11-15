import { BsTrash } from 'react-icons/bs';
import { Button, ConfigProvider, Flex, Form, Input, notification, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
// import { dummyData } from '../../../constant/constant';
import { useAddAdminMutation, useDeleteAdminMutation, useGetAdminQuery } from '../../../redux/features/admin/adminApi';
import { imageUrl } from '../../../redux/base/baseApi';

const MakeAdmin = () => {
    const { data: admins } = useGetAdminQuery([]);
    const [addAdmin] = useAddAdminMutation();
    const [deleteAdmin] = useDeleteAdminMutation();
    const [makeAdminModal, setMakeAdminModal] = useState(false);

    const onFinish = async (values: any) => {
        try {
            const res = await addAdmin(values).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
                setMakeAdminModal(false);
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while creating admin',
                placement: 'topRight',
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteAdmin(id).unwrap();
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
                description: error.data.message || 'Error occurred while deleting admin',
                placement: 'topRight',
            });
        }
    };
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            width: 150,
            render: (_text: string, _record: any, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Admin Name',
            dataIndex: 'name',
            key: 'name',
            render: (_name: string, record: any) => (
                <div className="flex items-center gap-3">
                    <img className="size-[30px] rounded-full" src={`${imageUrl}/${record.profile}`} alt="" />
                    <p>{record.name}</p>
                </div>
            ),
        },

        {
            title: 'Admin Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact No',
            dataIndex: 'contact',
            key: 'contact',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            textAlign: 'center',
            render: (text: string, record: any) => (
                <Popconfirm
                    onConfirm={() => handleDelete(record._id)}
                    title="Delete Admin"
                    description="Are you sure to delete this admin?"
                >
                    <button>
                        <BsTrash className="text-red-600" size={20} />
                    </button>
                </Popconfirm>
            ),
        },
    ];

    const addAdminForm = (
        <Form
            onFinish={onFinish}
            style={{
                color: '#767676',
            }}
            layout="vertical"
        >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                <Input
                    style={{
                        height: '40px',
                    }}
                    placeholder="John Doe"
                />
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                ]}
            >
                <Input
                    style={{
                        height: '40px',
                    }}
                    type="email"
                    placeholder="email@gmail.com"
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please enter your password!' },
                    { min: 8, message: 'Password must be at least 8 characters long!' },
                ]}
            >
                <Input
                    style={{
                        height: '40px',
                    }}
                    type="password"
                    placeholder="******"
                />
            </Form.Item>

            <Form.Item>
                <div className="flex justify-center w-full">
                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{
                            height: 40,
                            width: '100%',
                        }}
                    >
                        Add Admin
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );

    return (
        <div>
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <div className="my-4">
                        <h1 className="text-3xl text-primary font-semibold">Admin Management</h1>
                    </div>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setMakeAdminModal(true)}
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Add Admin
                    </Button>
                </div>
            </Flex>

            <ConfigProvider>
                <Table columns={columns} dataSource={admins} />
            </ConfigProvider>

            <CustomModal
                open={makeAdminModal}
                setOpen={setMakeAdminModal}
                title="Make Admin"
                width={500}
                body={addAdminForm}
            />
        </div>
    );
};

export default MakeAdmin;
