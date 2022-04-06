import { useState, useEffect } from "react";

export default FormImageUpload;

function FormImageUpload({ setInputs }) {
    const [selectedFile, setSelectedFile] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setInputs(values => ({ ...values, imageSrc: undefined, image: undefined }));
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setInputs(values => ({ ...values, imageSrc: objectUrl, image: selectedFile }));

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile, setInputs])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    }

    return (
        <div>
            <input type='file' onChange={onSelectFile} />
        </div>
    )
}