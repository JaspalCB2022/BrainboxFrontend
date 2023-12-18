import React, { useEffect, useState } from "react";
import CommonStatusCheck from "../../Shared/CommonStatusCheck/index";
import * as Yup from 'yup';
import { toast } from 'react-hot-toast'
// import { Error } from "../../../api/Error.js";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../Constants";
import { useCreateCustomerMutation, useDeleteCustomerMutation, useGetCustomerMutation, useUpdateCustomerMutation } from "../../../api/CustomersApi";


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

interface ICustomer{
  limit:number,
  skip: number,
  order: string, 
  field: string, 
  search: string
}


// interface APIResponse {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   tenantId: string;
//   slug: string;
// }
export interface DataResponse {
  id?: string
  first_name?: string
  last_name?: string
  email?: string
  tenantId?: string
  orginationName?: string
  slug?: string
  createdAt?: string
  updatedAt?: string
  updatedBy?: any 
}

export interface APIResponse {
  data?: DataResponse[] ;
  success?: boolean;
  error?: { message: string }; 
  count?: number | undefined;
  
}

export interface API {
  data?: APIResponse;
  error?: { message: string }; 
  count?: number | undefined;
}

function InvoiceAcessControl() {
  const [edit, setEdit] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [initialValues, setInitialValues] = useState({
  id:"1",tenent_id:"cc123-131dasd",organization_name:"abc"
  })
  
  const [data, setData] = useState<DataResponse[]>([])
  const [totalRecords, setTotalRecords] = useState<number | undefined >(0);
  // const [currData, setCurrData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [del, setDelete] = useState(false)
  const [close, setClose] = useState(false)
  // const [countryOptions, setCountryOptions] = useState<any[]>([])
  // const [companyOptions, setCompanyOptions] = useState<any[]>([])
  // const [supplierOptions, setSupplierOptions] = useState<any[]>([])
  const navigate = useNavigate()


const [getCustomerData] = useGetCustomerMutation();
// const [saveCustomerData] = useCreateCustomerMutation();
// const [editCustomerData] = useUpdateCustomerMutation();
// const [deleteCustomerData] = useDeleteCustomerMutation();


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

    getData(1)
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

  let getData = (currPage: number, setLoading?: (loading: boolean) => void, order?: string, field?: string, search?: string) => {
    let body = {
      limit: ITEMS_PER_PAGE,
      skip: (currPage - 1) * ITEMS_PER_PAGE,
      sortBy: field,
      sortType: order,
      search: search
    }
    setLoading && setLoading(true)
    getCustomerData(body)
      .then((data: any) => {

        console.log("data>>>>>",data.data.data)
        setLoading && setLoading(false)
        if (data.error) {
          // throw data.error.message
          throw new Error(data?.error?.message || "Unknown error occurred");
        }
        if (data?.data){
          setData(data?.data);
        }
        setTotalRecords(data?.count);
      })
      .catch((err) => {
        console.log("error>>>>>",err)
        return Error(err)
      });
  };

  let saveData = (values: any, { setSubmitting }: any) => {
    console.log("Data Save>>> values>>>",values)
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
  }

  let editData = (values: any, { setSubmitting }: any) => {
    console.log("Edit Save>>> values>>>",values)

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
  }

  let deleteData = () => {
    console.log("Delete Data>>>")

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
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string().required('Please enter ID'),
    TenentID: Yup.string().required('Please enter Tenent Id'),
    OrganizationName: Yup.date().required('Please enter organization Name'),

  });

  const fieldTypes = [
    {
      fieldName: 'Sr No',
      name: 'id',
      // type: 'input',
      required: true,
      notEditable: true,
    },
    {
      fieldName: 'Tenent ID',
      name: 'tenent_id',
      type: 'input',
      required: true,
      notEditable: true,
    },
    {
      fieldName: 'Organization Name',
      name: 'organization_name',
      type: 'input',
      required: true,
      notEditable: false,
    }
       // {
    //   fieldName: 'Country',
    //   name: 'Country',
    //   type: 'select',
    //   required: true,
    //   isMulti: true,
    //   // options: countryOptions,
    // },
  ];

  let onEdit = (data: any) => {
    console.log("called edit");
    
    // setInitialValues({
    //   "SupplierInvoiceNumber": data?.SupplierInvoiceNumber ,
    //   "InternalInvoiceNumber": data?.InternalInvoiceNumber ,
    //   "InvoiceDate": data?.InvoiceDate ,
    //   "PostingDate": data?.PostingDate ,
    //   "SupplierID": data?.SupplierID ,
    //   "Country": data?.Country ,
    //   "CompanyCode": data?.CompanyCode ,
    //   "InvoiceValue": data?.InvoiceValue ,
    //   "InvoiceCurrency": data?.InvoiceCurrency ,
    //   "UnplannedCost": data?.UnplannedCost ,
    //   "PaymentTerms": data?.PaymentTerms ,
    //   "PaymentBlock": data?.PaymentBlock ,
    //   "PaymentScheduledDate": data?.PaymentScheduledDate ,
    //   "ActualPaymentdDate": data?.ActualPaymentdDate ,
    //   "PaymentStatus": data?.PaymentStatus ,
    //   "UserContact": data?.UserContact ,
    //   "Requester": data?.Requester ,
    // })
    setRefresh(!refresh)
    setEdit(true)
    // setCurrData(data)
  }

  let onDelete = (data: any) => {
    // setCurrData(data)
    setDelete(true)
  }

  let packedData = {
    Data: data,
    getData: getData,
    onEdit: onEdit,
    onDelete: onDelete,
    count: totalRecords
  }

  let tableDefinition = fieldTypes.map((field) => ({
    header: field.fieldName,
    field: field.name,
    placeholder: `Search by ${field.name.toLowerCase()}`,
  }));

  return (
    <div>
      <CommonStatusCheck
        edit={edit}
        setEdit={setEdit}
        refresh={refresh}
        title="Customers "
        flyoutTitle={edit ? "Edit Customer" : "Add Customer"}
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
        bulkUrl={"url"}
        close={close}
        sampleFields={['Sr No', 'Tenent ID',"Organization Name"]}
      />
    
    </div>
  )
}

export default InvoiceAcessControl;
