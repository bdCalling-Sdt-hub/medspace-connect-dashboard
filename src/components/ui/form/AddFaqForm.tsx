import { Form, Input, Button } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';

const { TextArea } = Input;

interface AddFaqFormProps {
    onFinish: (values: any) => void;
    initialValues?: { question: string; answer: string };
    isEdit?: boolean;
}

const AddFaqForm = ({ onFinish, initialValues, isEdit }: AddFaqFormProps) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues} // Prepopulate fields for editing
        >
            <Form.Item
                label="Question"
                name="question"
                rules={[{ required: true, message: 'Please enter a question' }]}
            >
                <Input
                    style={{
                        height: 42,
                    }}
                    placeholder="Your FAQ question"
                />
            </Form.Item>

            <Form.Item label="Answer" name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
                <TextArea
                    style={{
                        width: '100%',
                        resize: 'none',
                        borderRadius: 6,
                        backgroundColor: '#F9F9F9',
                    }}
                    rows={3}
                    placeholder="Your FAQ answer"
                />
            </Form.Item>

            <Form.Item className="flex justify-center">
                <Button
                    icon={<AiOutlinePlus />}
                    htmlType="submit"
                    style={{
                        height: 40,
                    }}
                    type="primary"
                >
                    {isEdit ? 'Update FAQ' : 'Add FAQ'} {/* Dynamic button text */}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddFaqForm;
