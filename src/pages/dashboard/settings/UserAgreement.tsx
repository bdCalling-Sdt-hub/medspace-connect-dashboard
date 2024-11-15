import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, notification } from 'antd';
import {
    useAddAgreementMutation,
    useGetAgreementQuery,
    useUpdateAgreementMutation,
} from '../../../redux/features/agreement/agreementApi';

const UserAgreement = () => {
    const [addAgreement] = useAddAgreementMutation();
    const [updateAgreement] = useUpdateAgreementMutation();
    const { data: agreement } = useGetAgreementQuery([]);
    const editor = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (agreement?.content) {
            setContent(agreement.content);
        }
    }, [agreement]);
    const config = {
        readonly: false,
        placeholder: 'Start typing...',
        style: {
            height: '400px',
            background: 'white',
        },
    };

    //? handle
    const handleAgreement = async () => {
        const agreementData = {
            name: 'USERAGRREEMENT',
            content,
        };

        try {
            if (agreement?.content) {
                const updatedAgreementData = {
                    data: agreementData,
                    id: agreement._id,
                };
                const res = await updateAgreement(updatedAgreementData).unwrap();
                if (res.success) {
                    notification.success({
                        message: 'Success',
                        description: res.message,
                        placement: 'topRight',
                    });
                }
            } else {
                const res = await addAgreement(agreementData).unwrap();
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
                <h3 className="text-3xl text-primary font-semibold">User Agreement</h3>
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
                    onClick={handleAgreement}
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

export default UserAgreement;
