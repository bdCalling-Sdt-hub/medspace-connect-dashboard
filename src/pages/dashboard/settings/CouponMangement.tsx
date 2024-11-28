import { BsTrash } from 'react-icons/bs';
import {
    Button,
    ConfigProvider,
    DatePicker,
    Flex,
    Form,
    Input,
    InputNumber,
    notification,
    Popconfirm,
    Table,
} from 'antd';
import { useState } from 'react';
import CustomModal from '../../../components/shared/CustomModal';
import {
    useCreateCouponMutation,
    useDeleteCouponMutation,
    useGetCouponsQuery,
} from '../../../redux/features/coupon/couponApi';
import moment from 'moment';

const CouponManagement = () => {
    const { data: coupons } = useGetCouponsQuery([]);
    const [addCoupon] = useCreateCouponMutation();
    const [deleteCoupon] = useDeleteCouponMutation();

    const [CouponManagementModal, setCouponManagementModal] = useState(false);

    const onFinish = async (values: any) => {
        values.redeem_by = values.redeem_by.unix();
        values.name = values.name.toUpperCase();

        try {
            const res = await addCoupon(values).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                });
                setCouponManagementModal(false);
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while creating admin',
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteCoupon(id).unwrap();
            if (res.success) {
                notification.success({
                    message: res.message,
                });
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while deleting coupon',
            });
        }
    };
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (_text: string, _record: any, index: number) => <p>{index + 1}</p>,
        },
        {
            title: 'Coupon Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => <p>{name}</p>,
        },
        {
            title: 'Percent Off',
            dataIndex: 'percent_off',
            key: 'percent_off',
            render: (percent_off: number) => <p>{percent_off}%</p>,
        },
        {
            title: 'Max Redemptions',
            dataIndex: 'max_redemptions',
            key: 'max_redemptions',
            render: (max_redemptions: number) => <p>{max_redemptions}</p>,
        },
        {
            title: 'Valid Until',
            dataIndex: 'redeem_by',
            key: 'redeem_by',
            render: (redeem_by: number) => {
                const readableDate = moment.unix(redeem_by).format('MMMM Do, YYYY'); // e.g., "November 28th, 2024"
                return <p> {readableDate}</p>;
            },
        },

        {
            title: 'Action',
            key: 'action',
            render: (_text: string, record: any) => (
                <Popconfirm
                    title="Delete Coupon"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <button>
                        <BsTrash className="text-red-600" size={20} />
                    </button>
                </Popconfirm>
            ),
        },
    ];

    const addCouponForm = (
        <Form
            onFinish={onFinish} // Your submit handler
            style={{
                color: '#767676',
            }}
            layout="vertical"
            onValuesChange={(changedValues, allValues) => {
                // If redeem_by field changes, convert to Unix timestamp
                if (changedValues.redeem_by) {
                    const unixTimestamp = changedValues.redeem_by.unix(); // Convert to Unix timestamp
                    allValues.redeem_by = unixTimestamp; // Update the redeem_by field in allValues
                }
            }}
        >
            {/* Coupon Name */}
            <Form.Item
                label="Coupon Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the coupon name!' }]}
            >
                <Input
                    style={{
                        height: 42,
                        textTransform: 'uppercase', // Visually show text in uppercase
                    }}
                    placeholder="e.g., RANDOM4"
                    onKeyDown={(e) => {
                        // Prevent space from being typed
                        if (e.key === ' ') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        // Automatically remove spaces if any and convert to uppercase
                        const value = e.target.value.replace(/\s+/g, '').toUpperCase();
                        e.target.value = value; // This will dynamically update the input field
                    }}
                />
            </Form.Item>

            {/* Percent Off */}
            <Form.Item
                label="Percent Off"
                name="percent_off"
                rules={[
                    { required: true, message: 'Please enter the discount percentage!' },
                    {
                        type: 'number',
                        min: 1,
                        max: 100,
                        message: 'Percent off must be between 1 and 100!',
                    },
                ]}
            >
                <InputNumber
                    style={{
                        height: 42,
                        width: '100%',
                    }}
                    placeholder="e.g., 91"
                    min={1}
                    max={100}
                />
            </Form.Item>

            {/* Max Redemptions */}
            <Form.Item
                label="Max Redemptions"
                name="max_redemptions"
                rules={[
                    { required: true, message: 'Please enter the maximum redemptions allowed!' },
                    {
                        type: 'number',
                        min: 1,
                        message: 'Maximum redemptions must be at least 1!',
                    },
                ]}
            >
                <InputNumber
                    style={{
                        height: 42,
                        width: '100%',
                    }}
                    placeholder="e.g., 9"
                    min={1}
                />
            </Form.Item>

            {/* Redeem By (Expiration Date) */}
            <Form.Item
                label="Redeem By"
                name="redeem_by"
                rules={[{ required: true, message: 'Please enter the redeem-by date!' }]}
            >
                <DatePicker
                    style={{
                        height: 42,
                        width: '100%',
                    }}
                    format="YYYY-MM-DD"
                />
            </Form.Item>

            {/* Submit Button */}
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
                        Create Coupon
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
                        <h1 className="text-3xl font-semibold text-primary">Coupon Management</h1>
                    </div>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => setCouponManagementModal(true)}
                        type="primary"
                        style={{
                            height: 40,
                        }}
                    >
                        Add Coupon
                    </Button>
                </div>
            </Flex>

            <ConfigProvider>
                <Table columns={columns} dataSource={coupons} />
            </ConfigProvider>

            <CustomModal
                open={CouponManagementModal}
                setOpen={setCouponManagementModal}
                title="Add Coupon"
                width={500}
                body={addCouponForm}
            />
        </div>
    );
};

export default CouponManagement;
