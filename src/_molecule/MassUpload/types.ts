

export interface MassUploadProps {
    url: string | undefined;
    getData: (arg: number) => void;
    type: string | undefined;
    sampleFields: string[];
    onHide: () => void;
    errorFields: string[];
}

export interface FileUploadResponse {
    status: number;
    message: string;
    data?: {
        conflictingRecords?: any[]; // Adjust the type accordingly
        invalidData?: any[]; // Adjust the type accordingly
        invalidRows?: any[]; // Adjust the type accordingly
        filePath?: string;
    };
}