import './index.css';
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import cloud from "../../Icons/cloud.svg";

interface DropzoneProps {
  onFilesUploaded: (files: File[]) => void;
  preview?: boolean;
  disabled?: boolean;
  height?: string;
  width?: string | number;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFilesUploaded, preview = true, disabled = false, height, width = "100%" }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setUploadedFiles(files);
      onFilesUploaded(files);
    },
    [onFilesUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: "image/*",
    disabled: disabled,
  });

  const dropzoneStyle: React.CSSProperties = {
    height: height,
    width: width,
  };

  return (
    <div>
      <div {...getRootProps()} className='dropzone-style' style={dropzoneStyle}>
        <input {...getInputProps()} />
        <div className='dropzone-box'>
          <div>
            <img src={cloud} style={{ width: '25px', marginBottom: '10px' }} alt="cloud icon" />
            <div className='dropzone-text'>Drag & Drop to Upload File<br />OR</div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '5px' }}>
            <div
              className={`dropzone-browse-files btn-filled${disabled ? ' disabled' : ''}`}
            >
              Browse Files
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
