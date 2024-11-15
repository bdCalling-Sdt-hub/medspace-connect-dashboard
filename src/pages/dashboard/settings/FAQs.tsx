import { Button, Flex, notification } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { GoQuestion } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import CustomModal from '../../../components/shared/CustomModal';
import AddFaqForm from '../../../components/ui/form/AddFaqForm';
import {
    useAddFaqMutation,
    useDeleteFaqMutation,
    useGetFaqQuery,
    useUpdateFaqMutation,
} from '../../../redux/features/faq/faqApi';
import { useState } from 'react';

const FAQs = () => {
    const { data: faqs } = useGetFaqQuery([]);
    const [addFaq] = useAddFaqMutation();
    const [updateFaq] = useUpdateFaqMutation();
    const [deleteFaq] = useDeleteFaqMutation();
    const [openModal, setOpenModal] = useState(false);
    const [currentFaq, setCurrentFaq] = useState<any>(null); // Store current FAQ for editing

    const handleAddFaq = async (values: any) => {
        try {
            const res = await addFaq(values).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
                setOpenModal(false);
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while adding FAQ',
                placement: 'topRight',
            });
        }
    };

    const handleUpdateFaq = async (values: any) => {
        try {
            const res = await updateFaq({ id: currentFaq._id, data: { ...values } }).unwrap();
            if (res.success) {
                notification.success({
                    message: 'Success',
                    description: res.message,
                    placement: 'topRight',
                });
                setOpenModal(false);
                setCurrentFaq(null);
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while updating FAQ',
                placement: 'topRight',
            });
        }
    };

    const handleDeleteFaq = async (id: number) => {
        try {
            const res = await deleteFaq(id).unwrap();
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
                description: error.data.message || 'Error occurred while deleting FAQ',
                placement: 'topRight',
            });
        }
    };

    const handleEdit = (faq: any) => {
        setCurrentFaq(faq);
        setOpenModal(true);
    };

    return (
        <div>
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <h1 className="text-3xl text-primary font-semibold">FAQs</h1>
                <Button
                    onClick={() => {
                        setCurrentFaq(null); // Clear current FAQ for adding
                        setOpenModal(true);
                    }}
                    style={{
                        height: 40,
                    }}
                    type="primary"
                >
                    Add FAQs
                </Button>
            </Flex>

            <div className="space-y-6 my-5">
                <div className="bg-white py-6 px-4 rounded-md">
                    {faqs?.map((item, index) => (
                        <div key={index} className="flex justify-between items-start gap-4">
                            <div className="mt-3">
                                <GoQuestion color="#DBB162" size={25} />
                            </div>
                            <div className="w-full">
                                <p className="text-base font-medium border-b rounded-xl py-2 px-4 bg-slate-50">
                                    {item?.question}
                                </p>
                                <p className="text-[#919191] leading-[24px] my-4 bg-slate-50 py-2 px-4 rounded-xl">
                                    {item?.answer}
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <CiEdit
                                    size={24}
                                    onClick={() => handleEdit(item)}
                                    className="text-2xl cursor-pointer text-[#DBB162]"
                                />
                                <RxCross2
                                    size={24}
                                    onClick={() => handleDeleteFaq(item._id as number)}
                                    className="text-2xl cursor-pointer text-red-600"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <CustomModal
                open={openModal}
                setOpen={setOpenModal}
                title={currentFaq ? 'Edit FAQ' : 'Add FAQ'}
                width={500}
                body={
                    <AddFaqForm
                        onFinish={currentFaq ? handleUpdateFaq : handleAddFaq}
                        initialValues={currentFaq || { question: '', answer: '' }}
                        isEdit={!!currentFaq}
                    />
                }
            />
        </div>
    );
};

export default FAQs;
