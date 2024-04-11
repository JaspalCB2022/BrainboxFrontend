import React, { useEffect, useState } from "react";
import CommonStatusCheck from "../../Shared/CommonStatusCheck/index";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Error } from "../../../api/Error";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../../Constants";
import {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomerMutation,
  useUpdateCustomerMutation,
} from "../../../api/CustomersApi";
import { API, Customer, CustomerData, DAPI, DataResponse, PAPI } from "./types";
import { FormikHelpers } from "formik";

function Customers() {
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: "",
    tenantId: "",
    email:"",
    organizationName: "",
  });

  const [data, setData] = useState<DataResponse[]>([]);
  const [totalRecords, setTotalRecords] = useState<number | undefined>(0);
  const [currData, setCurrData] = useState<CustomerData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [del, setDelete] = useState(false);
  const [close, setClose] = useState(false);

  const navigate = useNavigate();

  const [getCustomerData] = useGetCustomerMutation();
  const [saveCustomerData] = useCreateCustomerMutation();
  const [editCustomerData] = useUpdateCustomerMutation();
  const [deleteCustomerData] = useDeleteCustomerMutation();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/");
    }
    getData(1);
  }, []);

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

  let getData = (
    currPage: number,
    setLoading?: (loading: boolean) => void,
    order?: string,
    field?: string,
    search?: string
  ) => {
    let body = {
      limit: ITEMS_PER_PAGE,
      skip: (currPage - 1) * ITEMS_PER_PAGE,
      sortBy: field,
      sortType:order,
      search: search,
    };

    setLoading && setLoading(true);
    getCustomerData(body)
      // @ts-ignore
      .then((data: API) => {
        setLoading && setLoading(false);
        if (data.error) {
          // throw data.error.message
          throw Error(data?.error?.message || "Unknown error occurred");
        }
        if (data?.data?.data) {
          const tempObj = data?.data?.data?.customers?.map((item, index) => {
            return { ...item, srno: index + 1 };
          });
          setData(tempObj);
          // setData(data?.data?.data.customers)
        }
        setTotalRecords(data?.data?.data?.count);
      })
      .catch((err) => {
        console.log("error>>>>>", err);
        return Error(err);
      });
  };

  let saveData = (
    values: Customer,
    { setSubmitting, resetForm }: FormikHelpers<Customer>
  ) => {
    console.log("Data Save>>> values>>>", values);
    const { tenantId, email ,organizationName } = values;
    let promise = saveCustomerData({ tenantId, email ,organizationName });
    toast.promise<PAPI>(promise as Promise<PAPI>, {
      loading: "Loading",
      success: (data: PAPI) => {
        console.log("Data>>>>>>", data);
        setSubmitting(false);
        if (data?.error) {
          throw data?.error;
        }
        getData(currentPage);
        setClose(!close);
        return "Customer created successfully";
      },
      error: (err: any): any => {
        setSubmitting(false);
        setClose(!close);
        return Error(err);
        // return "Customer creation fail"
      },
    });
    resetForm();
  };

  let editData = (
    values: Customer,
    { setSubmitting, resetForm }: FormikHelpers<Customer>
  ) => {
    console.log("Edit Save>>> values>>>", values);

    let promise = editCustomerData(values);
    toast.promise<PAPI>(promise as Promise<PAPI>, {
      loading: "Loading",
      success: (data: PAPI) => {
        setSubmitting(false);
        if (data.error) {
          throw data.error;
        }
        setInitialValues({ id: "", tenantId: "", email: "", organizationName: "" });
        setClose(!close);
        getData(currentPage);
        return "Customer edited successfully";
      },
      error: (err: any): any => {
        setSubmitting(false);
        setClose(!close);
        // setInitialValues({})
        return Error(err);
        // return "Edit Update Fail"
      },
    });
    resetForm();
  };

  let deleteData = () => {
    let promise = deleteCustomerData(currData?._id);
    setDelete(false);
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data) => {
        if (data?.error) {
          throw data?.error;
        }
        getData(currentPage);
        return "Customer deleted successfully";
      },
      error: (err: any): any => {
        // return "SomeThing Went Wrong"
        return Error(err);
      },
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const validationSchema = Yup.object().shape({
    // id: Yup.string().required('Please enter ID'),
    tenantId: Yup.string().required("Please enter Tenent Id"),
    email: Yup.string().email('Please enter valid email').required('Please enter email'),
    organizationName:  Yup.string().matches(/^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/ as RegExp, 'Enter alphanumeric characters').min(3).max(50).required('Please enter organization name'),
  });

  const fieldTypes = [
    {
      fieldName: "Sr No",
      name: "srno",
      // type: 'input',
      required: true,
      notEditable: true,
    },
    {
      fieldName: "Tenent ID",
      name: "tenantId",
      type: "input",
      required: true,
      notEditable: false,
    },
    {
      fieldName: "Email",
      name: "email",
      type: "input",
      required: true,
      notEditable: false,
    },
    {
      fieldName: "Organization Name",
      name: "organizationName",
      type: "input",
      required: true,
      notEditable: false,
    },
    // {
    //   fieldName: 'Country',
    //   name: 'Country',
    //   type: 'select',
    //   required: true,
    //   isMulti: true,
    //   // options: countryOptions,
    // },
  ];

  let onEdit = (data: CustomerData) => {
    console.log("called edit");
    console.log("editData>>>>>>", data);
    setInitialValues({
      id: data?._id,
      tenantId: data?.tenantId,
      email:data?.email,
      organizationName: data?.organizationName,
    });
    setRefresh(!refresh);
    setEdit(true);
    setCurrData(data);
  };

  let onDelete = (data: CustomerData) => {
    setDelete(true);
    setCurrData(data);
  };

  const onPortalView = (data: CustomerData) => {
    const url = `http://${data?.slug}.azurestaticapps.net/login`;
    window.open(url);
  };

  let packedData = {
    Data: data,
    getData: getData,
    onEdit: onEdit,
    onDelete: onDelete,
    count: totalRecords,
    onPortalView: onPortalView,
  };

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
        title="Customers"
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
        sampleFields={["Sr No", "Tenent ID", "Email" ,"Organization Name"]}
      />
    </div>
  );
}

export default Customers;
