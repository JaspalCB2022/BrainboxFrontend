import React, { useState, useEffect } from "react";
import CommonStatusCheck from "../../Shared/CommonStatusCheck";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ITEMS_PER_PAGE } from "../../../Constants";
import * as Yup from "yup";
import {
  useCreateFeatureMutation,
  useDeleteFeatureMutation,
  useGetFeatureMutation,
  useUpdateFeatureMutation,
} from "../../../api/FeaturesApi";
import toast from "react-hot-toast";
import {
  DataResponse,
  DAPI,
  API,
  FeatureData,
  Feature,
  FormFeatureData,
  FeatureName,
} from "./types";
import { FormikHelpers } from "formik";

const Features = () => {
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [initialValues, setInitialValues] = useState({
    _id: "",
    name: "",
    linkedFeature: "",
    children: [{ name: "" }],
  });

  const [data, setData] = useState<DataResponse[]>([]);
  const [totalRecords, setTotalRecords] = useState<number | undefined>(0);
  const [currData, setCurrData] = useState<FeatureData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [del, setDelete] = useState(false);
  const [close, setClose] = useState(false);

  const [getFeatureData] = useGetFeatureMutation();
  const [saveFeatureData] = useCreateFeatureMutation();
  const [editFeatureData] = useUpdateFeatureMutation();
  const [deleteFeatureData] = useDeleteFeatureMutation();

  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the cookie
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/");
    }
    getData(1);
  }, []);

  const updateForm = (
    values: FormFeatureData,
    setValues: React.Dispatch<React.SetStateAction<FormFeatureData>>
  ) => {
    console.log("valuesinside the updateForm >>>", values);
    // console.log("setValuesinside the updateForm >>>",setValues)
    const tmpObj = { ...values };
    console.log("tempsdfsdf", tmpObj);
    console.log("'children' in tmpObj >>", "children" in tmpObj);
    if (!("children" in tmpObj)) {
      tmpObj.children = [
        {
          name: "",
        },
      ];
      setValues({ ...values });
    } else {
      const children: FeatureName[] = [...(tmpObj.children || [])];
      children.push({
        name: "",
      });
      setValues({ ...tmpObj, children });
    }
  };

  const removeFromList = (
    i: number,
    values: FormFeatureData,
    setValues: React.Dispatch<React.SetStateAction<FormFeatureData>>
  ) => {
    console.log("values>>>", values);

    const children = [...(values.children || [])];
    children.splice(i, 1);
    setValues({ ...values, children });
  };

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
      sortType: order,
      search: search,
    };
    setLoading && setLoading(true);
    getFeatureData(body)
      // @ts-ignore
      .then((data: API) => {
        setLoading && setLoading(false);
        if (data.error) {
          // throw data.error.message
          throw Error(data?.error?.message || "Unknown error occurred");
        }
        if (data?.data?.data) {
          const tempObj = data?.data?.data?.features.map((item, index) => {
            return {
              ...item,
              srno: index + 1,
              linkedFeature: item?.children!.length > 0 ? "Yes" : "No",
            };
          });

          setData(tempObj);
        }
        setTotalRecords(data?.data?.data?.count);
      })
      .catch((err) => {
        return Error(err);
      });
  };

  let saveData = (
    values: FormFeatureData,
    { setSubmitting, resetForm }: FormikHelpers<FormFeatureData>
  ) => {
    console.log("Data Save>>> values>>>", values);
    const { name, children } = values;
    let promise = saveFeatureData({ name, children });
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data: DAPI) => {
        console.log("Data>>>>>>", data);
        setSubmitting(false);
        if (data?.error) {
          throw data?.error;
        }
        setClose(!close);
        getData(currentPage);
        setInitialValues({
          _id: "",
          name: "",
          linkedFeature: "",
          children: [{ name: "" }],
        });
        return "Feature created successfully";
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
    values: FormFeatureData,
    { setSubmitting, resetForm }: FormikHelpers<FormFeatureData>
  ) => {
    console.log("Edit Save>>> values>>>", values);

    let promise = editFeatureData(values);
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data: DAPI) => {
        setSubmitting(false);
        if (data.error) {
          throw data.error;
        }
        setClose(!close);
        getData(currentPage);
        return "Feature edited successfully";
      },
      error: (err: any): any => {
        setSubmitting(false);
        setClose(!close);
        return Error(err);
      },
    });
    resetForm();
    setInitialValues({
      _id: "",
      name: "",
      linkedFeature: "",
      children: [{ name: "" }],
    });
  };

  let deleteData = () => {
    let promise = deleteFeatureData(currData?._id);
    setDelete(false);
    toast.promise<DAPI>(promise as Promise<DAPI>, {
      loading: "Loading",
      success: (data) => {
        if (data?.error) {
          throw data?.error;
        }
        getData(currentPage);
        return "Feature deleted successfully";
      },
      error: (err: any): any => {
        // return "SomeThing Went Wrong"
        return Error(err);
      },
    });
  };

  const validationSchema = Yup.object().shape({
    // id: Yup.string().required('Please enter ID'),
    name: Yup.string().required("Please enter feature Title"),
    // linkedFeature: Yup.string().required('Please enter Feature'),
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fieldTypes = [
    {
      fieldName: "Sr No",
      name: "srno",
      // type: 'input',
      required: true,
      notEditable: true,
    },
    {
      fieldName: "Feature Title",
      name: "name",
      type: "input",
      required: true,
      notEditable: false,
    },
    {
      fieldName: "Linked Feature",
      name: "linkedFeature",
      type: "",
      required: true,
      notEditable: true,
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

  let onEdit = (data: FeatureData) => {
    console.log("called edit");
    console.log("editData>>>>>>", data);
    const transformedChildren = data?.children.map(
      (child: Feature, index: number) => {
        return { name: child.name, _id: child._id, isEnabled:child.isEnabled };
      }
    );
    console.log("transformedChildren>>>>",transformedChildren);
    
    setInitialValues({
      _id: data?._id,
      name: data?.name,
      linkedFeature: data?.linkedFeature,
      children: transformedChildren,
    });
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

    setRefresh(!refresh);
    setEdit(true);
    setCurrData(data);
  };

  let onDelete = (data: FeatureData) => {
    setDelete(true);
    setCurrData(data);
  };

  let packedData = {
    Data: data,
    getData: getData,
    onEdit: onEdit,
    onDelete: onDelete,
    count: totalRecords,
    onUpdate: updateForm,
    onRemoveFromList: removeFromList,
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
      />
    </div>
  );
};

export default Features;
