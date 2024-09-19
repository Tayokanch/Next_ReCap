'use client';
import React, { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface cloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState('');

  const handleSuccess = (result) => {
    console.log('Upload successful! This is the result:', result);
    if (result.event !== 'success') return;
    const info = result.info as cloudinaryResult;
    setPublicId(info.public_id);
  };

  const handleError = (error) => {
    console.error('Upload failed! Error:', error);
  };

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={300}
          height={200}
          alt="image"
          style={{ height: 'auto' }}
        />
      )}
      <CldUploadWidget
        uploadPreset="bau51yvj"
        options={{ sources: ['camera', 'local'], defaultSource: 'local' }}
        onSuccess={handleSuccess}
        onError={handleError}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="bg-blue-700 p-8 text-center hover:bg-blue-400"
          >
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
