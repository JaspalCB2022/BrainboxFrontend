export interface DropzoneProps {
    onFilesUploaded: (files: File[]) => void;
    preview?: boolean;
    disabled?: boolean;
    height?: string;
    width?: string | number;
  }