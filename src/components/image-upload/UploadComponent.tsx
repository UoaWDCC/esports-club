"use client";

import { useState } from "react";
import { useS3Upload } from "next-s3-upload";

export default function UploadComponent() {
    let [imageUrl, setImageUrl] = useState();
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    let handleFileChange = async (file) => {
        let { url } = await uploadToS3(file);
        setImageUrl(url);
    };

    return (
        <div>
            <FileInput onChange={handleFileChange} />

            <button onClick={openFileDialog}>Upload file</button>

            {imageUrl && <img src={imageUrl} />}
        </div>
    );
}
