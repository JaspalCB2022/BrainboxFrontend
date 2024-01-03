import React,{useState,useEffect, Children} from "react";
import CommonStatusCheck from "../../Shared/CommonStatusCheck";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ITEMS_PER_PAGE } from "../../../Constants";
import * as Yup from 'yup';
import { convertFormDataToApiFormat } from "../../../Utiles/Utiles";
import { useCreateFeatureMutation, useDeleteFeatureMutation, useGetFeatureMutation, useUpdateFeatureMutation } from "../../../api/FeaturesApi";
import toast from "react-hot-toast";

interface Input{
  fieldName: string,
  name:string,
  type: string,
  required: boolean,
  notEditable: boolean,
}

interface DataResponse {
  id?: string 
  isEnabled?: boolean 
  name?: string 
  parentId?: null 
  tenantId?: string |null 
  createdAt?: string 
  updatedAt?: string 
  updatedBy?: any  
  children?: DataResponse[]   
}

interface RES {
features:DataResponse[];
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


const Features = () => {
  const [edit, setEdit] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [initialValues, setInitialValues] = useState({
    id:"",name:"",linkedFeature:"" , children:[{name:'name'}]
  })
  
  const [data, setData] = useState<DataResponse[]>([])
  const [totalRecords, setTotalRecords] = useState<number | undefined >(0);
  const [currData, setCurrData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [del, setDelete] = useState(false)
  const [close, setClose] = useState(false)

  const [getFeatureData]  = useGetFeatureMutation();
  const [saveFeatureData] = useCreateFeatureMutation();
  const [editFeatureData] = useUpdateFeatureMutation();
  const [deleteFeatureData] = useDeleteFeatureMutation();

  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the cookie
    const token = Cookies.get('authToken');
    if(!token){
      navigate('/')
    }
  getData(1)
}, [])

// const [additionalInputs, setAdditionalInputs] = useState<Input[]>([]);

// const handleAddInput = () => {
//   const newInput = {
//     fieldName: `Child Field ${additionalInputs.length + 1}`,
//     name: `ChildField${additionalInputs.length + 1}`,
//     type: 'input',
//     required: true,
//     notEditable: false,
//   };

//   setAdditionalInputs((prevInputs) => [...prevInputs, newInput]);
// };

// const handleRemoveInput =(id:number)=>{
//   setAdditionalInputs((prevInputs) =>
//   prevInputs.filter((_, i) => i !== id)
// );
// }

const updateForm = (values:any,setValues:any)=>{
  console.log("valuesinside the updateForm >>>",values)
  // console.log("setValuesinside the updateForm >>>",setValues)
  const tmpObj = {...values};

  console.log("'children' in tmpObj >>", 'children' in tmpObj)
  if ( !('children' in tmpObj) ){
    tmpObj.children  = [{
      name:''
    }]
    setValues({...values})
  }
  else{
    const children = [...tmpObj.children]
    children.push({
      name:''
    });
    setValues({...tmpObj, children})
  }
  
  console.log("valuesssssssssss>>>",values);
}


const removeFromList = (i:number,values:any,setValues:any) =>{
const children = [...values.children]
children.splice(i,1);
setValues({...values,children})
}



  let getData = (currPage: number, setLoading?: (loading: boolean) => void, order?: string, field?: string, search?: string) => {
    let body = {
      limit: ITEMS_PER_PAGE,
      skip: (currPage - 1) * ITEMS_PER_PAGE,
      sortBy: field,
      sortType: order,
      search: search
    }
    console.log("body>>>>>",body)
    setLoading && setLoading(true)
    getFeatureData(body)
     // @ts-ignore 
      .then((data: API) => {
        console.log("data>>>>>>>>>>>>>>>",data?.data?.data)
        setLoading && setLoading(false)
        if (data.error) {
          // throw data.error.message
          throw Error(data?.error?.message || "Unknown error occurred");
        }
        if (data?.data?.data){
          const tempObj = data?.data?.data?.features.map((item, index) => {return {...item, srno: index +1 , linkedFeature :  item?.children!.length > 0? "Yes": "No" }})

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
    // const apiFormat  = convertFormDataToApiFormat(values)
    //console.log("APIFORMAT>>>>",apiFormat);
    
    let promise = saveFeatureData(values)
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data:DAPI) => {
        console.log("Data>>>>>>",data)
        setSubmitting(false)
        if (data?.error) {
          throw data?.error
        }
        getData(currentPage);
        setInitialValues({
          id:"",name:"",linkedFeature:"" , children:[{name:''}]
        });
        return "Customer created successfully";
      },
      error: (err:any):any => {
        setSubmitting(false)
        return Error(err)
        // return "Customer creation fail"
      },
    });
    resetForm();
    

  }

  let editData = (values: any, { setSubmitting ,resetForm}: any) => {
    console.log("Edit Save>>> values>>>",values)

    let promise = editFeatureData(values)
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data:DAPI) => {
        setSubmitting(false)
        if (data.error) {
          throw data.error
        }
        setInitialValues({
          id:"",name:"",linkedFeature:"" , children:[{name:''}]
        });
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
    let promise = deleteFeatureData(currData?.id)
    setDelete(false)
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data) => {
        if (data?.error) {
          throw data?.error
        }
        getData(currentPage)
        return "Feature deleted successfully";
      },
      error: (err:any):any => {
        // return "SomeThing Went Wrong"
        return Error(err)
      },
    });
  }

  const validationSchema = Yup.object().shape({
    // id: Yup.string().required('Please enter ID'),
    name: Yup.string().required('Please enter feature Title'),
    // linkedFeature: Yup.string().required('Please enter Feature'),

  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fieldTypes = [
    {
      fieldName: 'Sr No',
      name: 'srno',
      // type: 'input',
      required: true,
      notEditable: true,
    },
    {
      fieldName: 'Feature Title',
      name: 'name',
      type: 'input',
      required: true,
      notEditable: false,
    },
    {
      fieldName: 'Linked Feature',
      name: 'linkedFeature',
      // type: 'input',
      required: true,
      notEditable: true,
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


    // const convertToChildField = (child, index,data) => ({
    //   fieldName: `Child Field ${index +1}`,
    //   name: `ChildField${index +1}`,
    //   type: 'input',
    //   required: true,
    //   notEditable: false,
    // });

  const transformedChildren = data?.children.map((child: any, index: number) => {return {name: child.name}});

  console.log("transformed ",transformedChildren)
  ///setAdditionalInputs(transformedChildren)


  setInitialValues({
    id:data?.id,
    name:data?.name,
    linkedFeature:data?.linkedFeature,
    children: transformedChildren
    })

    
  //   // children: transformedChildren
  //   })
//   const dataChildren = data?.children || [];

//   // Map through data.children to create dynamic keys
//   const childrenValues = {};
  
//   dataChildren.forEach((child, index) => {
//     childrenValues[`childField${index + 1}`] = child.name;
//   });

//   const initialValues = {
//     id: data?.id,
//     name: data?.name,
//     linkedFeature: data?.linkedFeature,
//     ...childrenValues,
// };

// setInitialValues({...initialValues})

// // Use setInitialValues to update the state
// setInitialValues((prevValues) => ({
//   ...prevValues,
//   ...childrenValues,
// }));

console.log("initialvaluesss",initialValues);
    setRefresh(!refresh)
    setEdit(true)
    setCurrData(data)
  }

  let onDelete = (data: any) => {
    setDelete(true)
    setCurrData(data)
  }


  let packedData = {
    Data: data,
    getData: getData,
    onEdit: onEdit,
    onDelete: onDelete,
    count: totalRecords,
    // onPortalView: onPortalView
    onUpdate:updateForm,
    onRemoveFromList : removeFromList
  }

  // let featureData ={
  //   featureChild : additionalInputs,
  //   onAdd: handleAddInput,
  //   onRemove :handleRemoveInput
  // }

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
        title="Feature"
        flyoutTitle={edit ? "Edit Feature" : "Add Feature"}
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
        sampleFields={["Sr No", "Tenent ID", "Organization Name"]}
        // featureData={featureData}
      />
    </div>
  );
};

export default Features;
