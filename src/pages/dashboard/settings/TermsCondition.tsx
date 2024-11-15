import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, notification } from 'antd';
import {
    useAddTermsMutation,
    useGetTermsQuery,
    useUpdateTermsMutation,
} from '../../../redux/features/terms-condtion/termsApi';

const TermsCondition = () => {
    const [addTerms] = useAddTermsMutation();
    const [updateTerms] = useUpdateTermsMutation();
    const { data: terms } = useGetTermsQuery([]);
    const editor = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (terms?.content) {
            setContent(terms.content);
        }
    }, [terms]);

    const config = {
        readonly: false,
        placeholder: 'Start typing...',
        style: {
            height: '400px',
            background: 'white',
        },
    };

    const handleCreateTerms = async () => {
        const termsData = {
            name: 'TERMSANDCONDITIONS',
            content,
        };

        try {
            if (terms?.content) {
                const updatedTermsData = {
                    data: termsData,
                    id: terms._id,
                };
                const res = await updateTerms(updatedTermsData).unwrap();
                if (res.success) {
                    notification.success({
                        message: 'Success',
                        description: res.message,
                        placement: 'topRight',
                    });
                }
            } else {
                const res = await addTerms(termsData).unwrap();
                if (res.success) {
                    notification.success({
                        message: 'Success',
                        description: res.message,
                        placement: 'topRight',
                    });
                }
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.data.message || 'Error occurred while saving terms',
                placement: 'topRight',
            });
        }
    };

    return (
        <div className="bg-white px-4 py-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl text-primary font-semibold">Terms and Conditions</h3>
            </div>
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={() => {}}
                />
            </div>
            <div className="mt-6 flex justify-center">
                <Button
                    onClick={handleCreateTerms}
                    style={{
                        height: 40,
                        width: '150px',
                    }}
                    type="primary"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default TermsCondition;
