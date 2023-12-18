import React, { useEffect, useState } from 'react';
import Dropzone from '../../_atom/DropZone';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { toast } from 'react-hot-toast';
import axios_api from '../../api/axios_api';
import { ITEMS_PER_PAGE, tenantId } from '../../Constants';
import { Error } from '../../api/Error';
import { FilledButton } from '../../_atom/Buttons';
import close from '../../Icons/close 1.svg';
import excel from '../../Icons/excel.svg';
import './index.css';

interface MassUploadProps {
    url: string | undefined;
    getData: (arg: number) => void;
    type: string | undefined;
    sampleFields: string[];
    onHide: () => void;
    errorFields: string[];
}

interface FileUploadResponse {
    status: number;
    message: string;
    data?: {
        conflictingRecords?: any[]; // Adjust the type accordingly
        invalidData?: any[]; // Adjust the type accordingly
        invalidRows?: any[]; // Adjust the type accordingly
        filePath?: string;
    };
}

function MassUpload({
    url,
    getData,
    type,
    sampleFields,
    onHide,
    errorFields,
}: MassUploadProps): JSX.Element {
    const [documents, setDocuments] = useState<{ name: string; link: string }[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [uri, setUrl] = useState<string>('');
    const [conflictingData, setConflictingData] = useState<any[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [fields, setFields] = useState<string[]>([]);
    const [filePath, setFilePath] = useState<string>('');
    const [invalidData, setInvalidData] = useState<any[]>([]);
    const [showInvalid, setShowInvalid] = useState<boolean>(false);
    const [falseData, setFalseData] = useState<any[]>([]);

    useEffect(() => {
        createSampleFile();
    }, []);

    const handleFilesUploaded = (file: File[]) => {
        setFiles([file[0]]);
        // setDocuments([{ name: file[0].name, link: file[0].preview }]);
    };

    const removeDoc = (document: { name?: string }) => {
        const tempDocuments = [...documents];
        const docIndex = tempDocuments.findIndex((file) => file.name === document?.name);
        tempDocuments.splice(docIndex, 1);
        setDocuments(tempDocuments);

        const tempFiles = [...files];
        const fileIndex = tempFiles.findIndex((file) => file.name === document?.name);
        if (fileIndex !== -1) {
            tempFiles.splice(fileIndex, 1);
        }
        setFiles(tempFiles);
    };

    const handleBulkUpload = () => {
        const formData = new FormData();
        formData.append('excel', files[0]);
        formData.append('tenantId', tenantId as string);
        let promise = axios_api.post(`${url}/upload`, formData, {
            headers: { 'Content-type': 'multipart/form-data' },
        });
        toast.promise(promise, {
            loading: 'Loading',
            success: (data) => {
                if (data?.data?.data?.status === 409) {
                    setConflictingData(data?.data?.data?.data?.conflictingRecords);
                    let fields = Object.keys(data?.data?.data?.data?.conflictingRecords[0]);
                    setFilePath(data?.data?.data?.data?.filePath);
                    setShow(true);
                    onHide();
                    setFields(fields);
                    return data?.data?.data?.message;
                }
                if (data?.data?.data?.status === 400) {
                    setShowInvalid(true);
                    setFalseData(data?.data?.data?.data?.invalidData);
                    onHide();
                    setInvalidData(data?.data?.data?.data?.invalidRows);
                    setFilePath(data?.data?.data?.data?.filePath);
                    throw data?.data?.data?.message;
                }
                getData(1);
                setDocuments([]);
                return 'Data uploaded successfully';
            },
            error: (err) => {
                if (err === 'Invalid records found') {
                    return 'Invalid records found';
                }
                return err?.response?.data?.error?.message;
            },
        });
    };

    const skipAndSave = () => {
        let data = {
            conflictingRecords: conflictingData?.length ? conflictingData : invalidData,
            filePath: filePath,
            tenantId: tenantId,
        };
        // let promise = axios_api.post(`${url}/skipAndSave`, data);
        // toast.promise(promise, {
        //     loading: 'Loading',
        //     success: (data) => {
        //         setShow(false);
        //         setShowInvalid(false);
        //         setDocuments([]);
        //         return data?.data?.data?.message;
        //     },
        //     error: (err) => {
        //         return Error(err);
        //     },
        // });
    };

    const createSampleFile = () => {
        // let append = ['A', 'B', 'C', 'D']
        // let columnNames = sampleFields
        // let data = []
        // for (let i of append) {
        //     let temp = columnNames?.map(e => e + " " + i)
        //     data.push(temp)
        // }
        // const wb = XLSX.utils.book_new();
        // const ws = XLSX.utils.aoa_to_sheet([columnNames, ...data]);
        // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        // const base64String = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
        // const dataURI = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + base64String;
        // setUrl(dataURI)
    };

    const customComponent = (rowData: any, data: any, field: string) => {
        if (data?.invalidValues?.length) {
            let obj: Record<string, { color: string }> = {};
            rowData[field]?.split(',')?.map((d: string, id: number) => {
                if (data?.invalidValues?.includes(d)) {
                    obj = { ...obj, [d]: { color: 'red' } };
                } else {
                    obj = { ...obj, [d]: { color: 'black' } };
                }
            });
            const combinedCell = JSON.stringify(obj);
            const parsedObj = JSON.parse(combinedCell);

            const elementsToRender = Object.keys(parsedObj).map((key, id) => (
                <span key={key} style={{ color: parsedObj[key].color }}>
                    {key}
                    <span>{id === Object.keys(parsedObj)?.length - 1 ? '' : ','}</span>
                </span>
            ));

            return <div>{elementsToRender}</div>;
        }
        return rowData[field];
    };

    const dialogHeader = () => {
        return (
            <>
                <div>Invalid Data </div>
                <span style={{ color: 'red', fontSize: '12px', fontWeight: '400' }}>
                    **Highlighted entries are not present in the source table
                </span>
            </>
        );
    };

    const renderHeader = dialogHeader();

    return (
        <>
            <div className="mass-upload-box">
                <div style={{ display: 'flex' }}>
                    <div className={'edit-general-box-heading'}>Chose Document</div>
                    <a
                        className="mass-upload-file"
                        href={uri}
                        target="_blank"
                        download={type}
                        rel="noreferrer"
                    >
                        <img
                            title="sample file"
                            style={{ width: '25px', height: '25px' }}
                            src={excel}
                            alt="excel"
                        ></img>
                    </a>
                </div>
                <div style={{}}>
                    <Dropzone height="300px" width="100%" onFilesUploaded={handleFilesUploaded} />
                </div>
                {documents?.length > 0 && (
                    <div className="document_box">
                        {documents.map((document, index) => (
                            <div className="selected_document" key={index}>
                                <a
                                    style={{ textDecoration: 'none', color: 'var(--color-primary)' }}
                                    href={document?.link}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {document?.name}
                                </a>
                                <img
                                    src={close}
                                    height="8px"
                                    style={{ cursor: 'pointer', marginLeft: '6px' }}
                                    alt="close"
                                    onClick={() => removeDoc(document)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <FilledButton
                disabled={!documents?.length}
                content="Upload"
                style={{ height: '50px', width: '112px', borderRadius: '5px', marginTop: '22px' }}
                onClick={handleBulkUpload}
            />
            <Dialog
                header={'Duplicate Entries'}
                visible={show}
                onHide={() => setShow(false)}
                breakpoints={{ '960px': '75vw', '640px': '100vw' }}
                style={{ width: '50vw' }}
            >
                <DataTable value={conflictingData} paginator rows={ITEMS_PER_PAGE} dataKey="id" showGridlines>
                    {fields?.map((def, id) => (
                        <Column key={id} field={def} header={def} sortable />
                    ))}
                </DataTable>
                <FilledButton content="Skip and save" filled={true} style={{ marginTop: '30px' }} onClick={skipAndSave} />
            </Dialog>
            <Dialog
                header={renderHeader}
                visible={showInvalid}
                onHide={() => setShowInvalid(false)}
                breakpoints={{ '960px': '75vw', '640px': '100vw' }}
                style={{ width: '80vw' }}
            >
                <DataTable value={invalidData} paginator rows={ITEMS_PER_PAGE} dataKey="id" showGridlines>
                    {errorFields?.map((def, id) => {
                        let data = falseData.find((e) => e.columnName === def);
                        return (
                            <Column
                                key={id}
                                field={def}
                                header={def}
                                sortable
                                body={(rowData) => customComponent(rowData, data, def)}
                            />
                        );
                    })}
                </DataTable>
                <FilledButton content="Skip and save" filled={true} style={{ marginTop: '30px' }} onClick={skipAndSave} />
            </Dialog>
        </>
    );
}

export default MassUpload;
