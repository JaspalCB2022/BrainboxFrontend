import React, { useEffect, useState } from "react";
import CommonStatusCheck from "../../Shared/CommonStatusCheck/index";
import * as Yup from 'yup';
import { toast } from 'react-hot-toast'
import { Error } from "../../../api/Error";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../Constants";
import { useCreateCustomerMutation, useDeleteCustomerMutation, useGetCustomerMutation, useUpdateCustomerMutation } from "../../../api/CustomersApi";




interface ICustomer{
  limit:number,
  skip: number,
  order: string, 
  field: string, 
  search: string
}

 interface DataResponse {
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

interface RES {
customers:DataResponse[];
count:number | undefined;
}

export interface APIResponse {
  data?: RES ;
  success?: boolean;
  error?: { message: string }; 
  
}

export interface API {
  data?: APIResponse;
  error?: { message: string }; 
}

interface PRES {
  tenantId?: string
  orginationName?: string
}

interface PResponse{
  data?: PRES ;
  success?: boolean;
  error?: { message: string }; 
}

interface PAPI {
  data?: PResponse ;
  error?: { message: string }; 
}

interface DRES {
  message?: string
}

interface DResponse{
  data?: DRES ;
  success?: boolean;
  error?: { message: string }; 
}

interface DAPI {
  data?: DResponse ;
  error?: { message: string }; 
}

function Customers() {
  const [edit, setEdit] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [initialValues, setInitialValues] = useState({
    id:"",tenantId:"",orginationName:""
  })
  
  const [data, setData] = useState<DataResponse[]>([])
  const [totalRecords, setTotalRecords] = useState<number | undefined >(0);
  const [currData, setCurrData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [del, setDelete] = useState(false)
  const [close, setClose] = useState(false)
  // const [countryOptions, setCountryOptions] = useState<any[]>([])
  // const [companyOptions, setCompanyOptions] = useState<any[]>([])
  // const [supplierOptions, setSupplierOptions] = useState<any[]>([])
  const navigate = useNavigate();


  const [getCustomerData] = useGetCustomerMutation();
  const [saveCustomerData] = useCreateCustomerMutation();
  const [editCustomerData] = useUpdateCustomerMutation();
  const [deleteCustomerData] = useDeleteCustomerMutation();


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
  //   getCountryData(body)
  //     .then((data) => {
  //       let temp = data?.data?.data?.list?.map((d, id) => ({ value: d.CountryName, label: d.CountryName }))
  //       setCountryOptions(temp)
  //     })
  //     .catch(err => console.log(err))
  // }

  // let getCompanyCode = () => {
  //   let body = {
  //     limit: 0,
  //     skip: 0,
  //   }
  //   getCompanyData(body)
  //     .then((data) => {
  //       let temp = data?.data?.data?.list?.map((d, id) => ({ value: `${d.CompanyCodeId}-${d.Description}`, label: `${d.CompanyCodeId}-${d.Description}` }))
  //       setCompanyOptions(temp)
  //     })
  //     .catch(err => console.log(err))
  // };

  // let getSupplier = () => {
  //   let body = {
  //     limit: 0,
  //     skip: 0,
  //   }
  //   getSupplierData(body)
  //     .then((data) => {
  //       let temp = data?.data?.data?.list?.map((d, id) => ({ value: `${d?.CompanyCodeId}-${d?.SupplierName}`, label: `${d?.CompanyCodeId}-${d?.SupplierName}` }))
  //       setSupplierOptions(temp)
  //     })
  //     .catch(err => console.log(err))
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
     // @ts-ignore 
      .then((data: API) => {
        console.log("data>>>>>>>>>>>>>>>",data?.data?.data)
        setLoading && setLoading(false)
        if (data.error) {
          // throw data.error.message
          throw Error(data?.error?.message || "Unknown error occurred");
        }
        if (data?.data?.data){
          const tempObj = data?.data?.data?.customers?.map((item, index) => {return {...item, srno: index +1 }})
          setData(tempObj);
          // setData(data?.data?.data.customers)
        }
        setTotalRecords(data?.data?.data?.count);
      })
      .catch((err) => {
        console.log("error>>>>>",err)
        return Error(err)
      });
  };

  let saveData = (values: any, { setSubmitting,resetForm }: any) => {
    console.log("Data Save>>> values>>>",values)
    const {tenantId, orginationName} =  values
    let promise = saveCustomerData({tenantId,orginationName})
    toast.promise<PAPI>(promise as Promise<PAPI>, {
      loading: "Loading",
      success: (data:PAPI) => {
        console.log("Data>>>>>>",data)
        setSubmitting(false)
        if (data?.error) {
          throw data?.error
        }
        getData(currentPage)
        return "Customer created successfully";
      },
      error: (err:any):any => {
        // console.log("err>>>>>>>>>>>>>>",err)
        // const {status ,data} = err
        // console.log("status>>>>>>>>>>>>>>",status)
        // console.log("data>>>>>>>>>>>>>>",data)
        // const {error,success} = data
        // console.log("error>>>>>>>>>>>>>>",error)
        // console.log("success>>>>>>>>>>>>>>",success)
        // const {message} = error
        // console.log("message>>>>>>>>>>>>>>",message)

        setSubmitting(false)
        // return Error(message)
        return Error(err)
        // return "Customer creation fail"
      },
    });
    resetForm();

  }

  let editData = (values: any, { setSubmitting ,resetForm}: any) => {
    console.log("Edit Save>>> values>>>",values)

    let promise = editCustomerData(values)
    toast.promise<PAPI>(promise as Promise<PAPI>, {
      loading: "Loading",
      success: (data:PAPI) => {
        setSubmitting(false)
        if (data.error) {
          throw data.error
        }
        setInitialValues({ id:"", tenantId: "", orginationName:""})
        setClose(!close)
        getData(currentPage)
        return "Customer edited successfully";
      },
      error: (err:any):any => {
        setSubmitting(false)
        setClose(!close)
        // setInitialValues({})
        return Error(err)
        // return "Edit Update Fail"
      },
    });
    resetForm();

  }

  let deleteData = () => {
    let promise = deleteCustomerData(currData?.id)
    setDelete(false)
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data) => {
        if (data?.error) {
          throw data?.error
        }
        getData(currentPage)
        return "Customer deleted successfully";
      },
      error: (err:any):any => {
        // return "SomeThing Went Wrong"
        return Error(err)
      },
    });
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const validationSchema = Yup.object().shape({
    // id: Yup.string().required('Please enter ID'),
    tenantId: Yup.string().required('Please enter Tenent Id'),
    orginationName: Yup.string().required('Please enter organization Name'),

  });

  const fieldTypes = [
    {
      fieldName: 'Sr No',
      name: 'srno',
      // type: 'input',
      required: true,
      notEditable: true,
    },
    {
      fieldName: 'Tenent ID',
      name: 'tenantId',
      type: 'input',
      required: true,
      notEditable: false,
    },
    {
      fieldName: 'Organization Name',
      name: 'orginationName',
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
    console.log("editData>>>>>>",data)
    setInitialValues({
    id:data?.id,
    tenantId:data?.tenantId,
    orginationName:data?.orginationName,
    })
    setRefresh(!refresh)
    setEdit(true)
    setCurrData(data)
  }

  let onDelete = (data: any) => {
    setDelete(true)
    setCurrData(data)
  }

  const onPortalView =()=> {
    console.log("hitting");
    const authenticationToken = Cookies.get('authToken');
      const url = `http://addidas-shoes.localhost:3002/cdashboard?token=${authenticationToken}`;
      window.open(url);
    
  }



  let packedData = {
    Data: data,
    getData: getData,
    onEdit: onEdit,
    onDelete: onDelete,
    count: totalRecords,
    onPortalView: onPortalView
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

export default Customers;
