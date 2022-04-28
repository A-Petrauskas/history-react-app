import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

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
            <Form.Group controlId="formFile" className="mb-3" style={{ width: "200px" }} >
                <Form.Control type="file" size="sm" onChange={onSelectFile} />
            </Form.Group>
        </div >
    )
}