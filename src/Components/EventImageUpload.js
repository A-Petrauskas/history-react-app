import { useState, useEffect } from "react";

export default EventImageUpload;

function EventImageUpload({ setInputs }) {
    const [selectedFile, setSelectedFile] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setInputs(values => ({ ...values, imageSrc: undefined }));
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setInputs(values => ({ ...values, imageSrc: objectUrl }));

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