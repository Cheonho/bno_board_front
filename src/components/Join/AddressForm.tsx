import React from "react";
import DaumPostcode from "react-daum-postcode";

interface AddressFormProps {
    address: string;
    code: string;
    detail: string;
    onChange: (field: string, value: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, code, detail, onChange }) => {
    const handleComplete = (data: any) => {
        const fullAddr = `${data.address} (${data.zonecode})`;
        onChange("address", fullAddr);
    };

    return (
        <div>
            <input placeholder="주소" value={address} readOnly />
            <input placeholder="우편번호" value={code} readOnly />
            <input
                placeholder="상세주소"
                value={detail}
                onChange={(e) => onChange("detail", e.target.value)}
            />
            <DaumPostcode onComplete={handleComplete} />
        </div>
    );
};

export default AddressForm;
