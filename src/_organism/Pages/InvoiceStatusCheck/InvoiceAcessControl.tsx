import React, { useEffect, useState } from "react";
// import CommonStatusCheck from "../../Shared/CommonStatusCheck.js/index.js";
// import * as Yup from 'yup';
// import { toast } from 'react-hot-toast'
// import { useGetInvoiceDataMutation, useSaveInvoiceDataMutation, useEditInvoiceDataMutation, useDeleteInvoiceDataMutation } from "../../../api/invoiceApi.js";
// import { INVOICE, INVOICE_GET, ITEMS_PER_PAGE } from "../../../Constants.js";
// import { Error } from "../../../api/Error.js";
// import { useGetCompanyDataMutation } from "../../../api/companyApi.js";
// import { useGetCountryDataMutation } from "../../../api/countryApi.js";
// import { useGetSupplierDataMutation } from "../../../api/supplierApi.js";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


// interface InitialValues {
//   SupplierInvoiceNumber: string;
//   InternalInvoiceNumber: string;
//   InvoiceDate: string;
//   PostingDate: string;
//   SupplierID: string;
//   Country: string;
//   CompanyCode: string;
//   InvoiceValue: string;
//   InvoiceCurrency: string;
//   UnplannedCost: string;
//   PaymentTerms: string;
//   PaymentBlock: string;
//   PaymentScheduledDate: string;
//   ActualPaymentdDate: string;
//   PaymentStatus: string;
//   UserContact: string;
//   Requester: string;
// }

function InvoiceAcessControl() {
  // const [edit, setEdit] = useState(false)
  // const [refresh, setRefresh] = useState(false)
  // const [initialValues, setInitialValues] = useState<InitialValues>({
  //   "SupplierInvoiceNumber": "",
  //   "InternalInvoiceNumber": "",
  //   "InvoiceDate": "",
  //   "PostingDate": "",
  //   "SupplierID": "",
  //   "Country": "",
  //   "CompanyCode": "",
  //   "InvoiceValue": "",
  //   "InvoiceCurrency": "",
  //   "UnplannedCost": "",
  //   "PaymentTerms": "",
  //   "PaymentBlock": "",
  //   "PaymentScheduledDate": "",
  //   "ActualPaymentdDate": "",
  //   "PaymentStatus": "",
  //   "UserContact": "",
  //   "Requester": ""
  // })
  // const [data, setData] = useState<any[]>([])
  // const [totalRecords, setTotalRecords] = useState<number>(0);
  // const [currData, setCurrData] = useState<any>({});
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [del, setDelete] = useState(false)
  // const [close, setClose] = useState(false)
  // const [countryOptions, setCountryOptions] = useState<any[]>([])
  // const [companyOptions, setCompanyOptions] = useState<any[]>([])
  // const [supplierOptions, setSupplierOptions] = useState<any[]>([])
  const navigate = useNavigate()

//   const [getInvoiceData] = useGetInvoiceDataMutation();
//   const [saveInvoiceData] = useSaveInvoiceDataMutation();
//   const [editInvoiceData] = useEditInvoiceDataMutation();
//   const [deleteInvoiceData] = useDeleteInvoiceDataMutation();

//   const [getCompanyData] = useGetCompanyDataMutation()
//   const [getCountryData] = useGetCountryDataMutation();
//   const [getSupplierData] = useGetSupplierDataMutation();

  useEffect(() => {

 
      // Get the token from the cookie
      const token = Cookies.get('authToken');
  if(!token){
navigate('/')
  }
      // Use the token in your API requests or for authentication
      console.log('Token:', token);

    // getData(1)
    // getCompanyCode()
    // getCountry()
    // getSupplier()
  }, [])

  // let getCountry = () => {
  //   let body = {
  //     limit: 0,
  //     skip: 0,
  //   }
    // getCountryData(body)
    //   .then((data) => {
    //     let temp = data?.data?.data?.list?.map((d, id) => ({ value: d.CountryName, label: d.CountryName }))
    //     setCountryOptions(temp)
    //   })
    //   .catch(err => console.log(err))
  // }

  // let getCompanyCode = () => {
  //   let body = {
  //     limit: 0,
  //     skip: 0,
  //   }
    // getCompanyData(body)
    //   .then((data) => {
    //     let temp = data?.data?.data?.list?.map((d, id) => ({ value: `${d.CompanyCodeId}-${d.Description}`, label: `${d.CompanyCodeId}-${d.Description}` }))
    //     setCompanyOptions(temp)
    //   })
    //   .catch(err => console.log(err))
  // };

  // let getSupplier = () => {
  //   let body = {
  //     limit: 0,
  //     skip: 0,
  //   }
    // getSupplierData(body)
    //   .then((data) => {
    //     let temp = data?.data?.data?.list?.map((d, id) => ({ value: `${d?.CompanyCodeId}-${d?.SupplierName}`, label: `${d?.CompanyCodeId}-${d?.SupplierName}` }))
    //     setSupplierOptions(temp)
    //   })
    //   .catch(err => console.log(err))
  // };

  // let getData = (currPage: number, setLoading?: (loading: boolean) => void, order?: string, field?: string, search?: string) => {
  //   let body = {
  //     limit: ITEMS_PER_PAGE,
  //     skip: (currPage - 1) * ITEMS_PER_PAGE,
  //     sortBy: field,
  //     sortType: order,
  //     search: search
  //   }
    // setLoading && setLoading(true)
    // getInvoiceData(body)
    //   .then((data) => {
    //     setLoading && setLoading(false)
    //     if (data.error) {
    //       throw data.error
    //     }
    //     setData(data?.data?.data?.list);
    //     setTotalRecords(data.data?.data?.count);
    //   })
    //   .catch((err) => {
    //     return Error(err)
    //   });
  // };

  // let saveData = (values: any, { setSubmitting }: any) => {
    // let promise = saveInvoiceData(values)
    // toast.promise(promise, {
    //   loading: "Loading",
    //   success: (data) => {
    //     setSubmitting(false)
    //     if (data.error) {
    //       throw data.error
    //     }
    //     getData(currentPage)
    //     return "Invoice Code saved successfully";
    //   },
    //   error: err => {
    //     setSubmitting(false)
    //     return Error(err)
    //   },
    // });
  // }

  // let editData = (values: any, { setSubmitting }: any) => {
    // let promise = editInvoiceData(values)
    // toast.promise(promise, {
    //   loading: "Loading",
    //   success: (data) => {
    //     setSubmitting(false)
    //     if (data.error) {
    //       throw data.error
    //     }
    //     setInitialValues({})
    //     setClose(!close)
    //     getData(currentPage)
    //     return "Invoice Code edited successfully";
    //   },
    //   error: err => {
    //     setSubmitting(false)
    //     setClose(!close)
    //     setInitialValues({})
    //     return Error(err)
    //   },
    // });
  // }

  // let deleteData = () => {
    // let promise = deleteInvoiceData(currData?.InvoiceId)
    // toast.promise(promise, {
    //   loading: "Loading",
    //   success: (data) => {
    //     if (data.error) {
    //       throw data.error
    //     }
    //     getData(currentPage)
    //     setDelete(false)
    //     return "Invoice Code deleted successfully";
    //   },
    //   error: err => {
    //     return Error(err)
    //   },
    // });
  // }

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  // const validationSchema = Yup.object().shape({
  //   SupplierInvoiceNumber: Yup.string().required('Please enter supplier invoice number'),
  //   InternalInvoiceNumber: Yup.string().required('Please enter internal invoice number'),
  //   InvoiceDate: Yup.date().required('Please enter invoice date'),
  //   PostingDate: Yup.date().required('Please enter posting date'),
  //   SupplierID: Yup.string().required('Please enter supplier ID'),
  //   Country: Yup.string().required('Please enter country'),
  //   CompanyCode: Yup.string().required('Please enter company code'),
  //   InvoiceValue: Yup.number().required('Please enter invoice value'),
  //   InvoiceCurrency: Yup.string().required('Please enter invoice currency'),
  //   UnplannedCost: Yup.number().required('Please enter unplanned cost'),
  //   PaymentTerms: Yup.string().required('Please enter payment terms'),
  //   PaymentBlock: Yup.string().required('Please enter payment block'),
  //   PaymentScheduledDate: Yup.date().required('Please enter payment scheduled date'),
  //   ActualPaymentdDate: Yup.date().required('Please enter actual payment date'),
  //   PaymentStatus: Yup.string().required('Please enter payment status'),
  //   UserContact: Yup.string().required('Please enter user contact'),
  //   Requester: Yup.string().required('Please enter requester'),
  // });

  // const fieldTypes = [
  //   {
  //     fieldName: 'Supplier Invoice Number',
  //     name: 'SupplierInvoiceNumber',
  //     type: 'input',
  //     required: true,
  //     notEditable: true,
  //   },
  //   {
  //     fieldName: 'Internal Invoice Number',
  //     name: 'InternalInvoiceNumber',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Invoice Date',
  //     name: 'InvoiceDate',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Posting Date',
  //     name: 'PostingDate',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Supplier ID',
  //     name: 'SupplierID',
  //     type: 'select',
  //     required: true,
  //     isMulti: true,
  //     options: supplierOptions,
  //   },
  //   {
  //     fieldName: 'Country',
  //     name: 'Country',
  //     type: 'select',
  //     required: true,
  //     isMulti: true,
  //     options: countryOptions,
  //   },
  //   {
  //     fieldName: 'Company Code',
  //     name: 'CompanyCode',
  //     type: 'select',
  //     required: true,
  //     isMulti: true,
  //     options: companyOptions,
  //   },
  //   {
  //     fieldName: 'Invoice Value',
  //     name: 'InvoiceValue',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Invoice Currency',
  //     name: 'InvoiceCurrency',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Unplanned Cost',
  //     name: 'UnplannedCost',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Payment Terms',
  //     name: 'PaymentTerms',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Payment Block',
  //     name: 'PaymentBlock',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Payment Scheduled Date',
  //     name: 'PaymentScheduledDate',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Actual Payment Date',
  //     name: 'ActualPaymentdDate',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Payment Status',
  //     name: 'PaymentStatus',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'User Contact',
  //     name: 'UserContact',
  //     type: 'input',
  //     required: true,
  //     notEditable: false,
  //   },
  //   {
  //     fieldName: 'Requester',
  //     name: 'Requester',
  //     type: 'input',
  //     required: true,
  //     notEditable: true,
  //   },
  // ];

  // let onEdit = (data: any) => {
  //   setInitialValues({
  //     "SupplierInvoiceNumber": data?.SupplierInvoiceNumber ,
  //     "InternalInvoiceNumber": data?.InternalInvoiceNumber ,
  //     "InvoiceDate": data?.InvoiceDate ,
  //     "PostingDate": data?.PostingDate ,
  //     "SupplierID": data?.SupplierID ,
  //     "Country": data?.Country ,
  //     "CompanyCode": data?.CompanyCode ,
  //     "InvoiceValue": data?.InvoiceValue ,
  //     "InvoiceCurrency": data?.InvoiceCurrency ,
  //     "UnplannedCost": data?.UnplannedCost ,
  //     "PaymentTerms": data?.PaymentTerms ,
  //     "PaymentBlock": data?.PaymentBlock ,
  //     "PaymentScheduledDate": data?.PaymentScheduledDate ,
  //     "ActualPaymentdDate": data?.ActualPaymentdDate ,
  //     "PaymentStatus": data?.PaymentStatus ,
  //     "UserContact": data?.UserContact ,
  //     "Requester": data?.Requester ,
  //   })
  //   setRefresh(!refresh)
  //   setEdit(true)
  //   setCurrData(data)
  // }

  // let onDelete = (data: any) => {
  //   setCurrData(data)
  //   setDelete(true)
  // }

  // let packedData = {
  //   Data: data,
  //   getData: getData,
  //   onEdit: onEdit,
  //   onDelete: onDelete,
  //   count: totalRecords
  // }

  // let tableDefinition = fieldTypes.map((field) => ({
  //   header: field.fieldName,
  //   field: field.name,
  //   placeholder: `Search by ${field.name.toLowerCase()}`,
  // }));

  return (
    <div>
      {/* <CommonStatusCheck
        edit={edit}
        setEdit={setEdit}
        refresh={refresh}
        title="Invoice Code"
        flyoutTitle={edit ? "Edit Invoice code" : "Add Invoice code"}
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleSubmit={edit ? editData : saveData}
        fieledTypes={fieldTypes}
        tableDefinition={tableDefinition}
        onPageChange={handlePageChange}
        setDelete={setDelete}
        del={del}
        packedData={packedData}
        handleDelete={deleteData}
        setInitialValues={setInitialValues}
        bulkUrl={INVOICE}
        close={close}
        sampleFields={['InvoiceId', 'InvoiceDescription']}
      /> */}
      Dashboard
    </div>
  )
}

export default InvoiceAcessControl;
