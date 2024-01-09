import { FormikValues, FormikHelpers, FormikErrors, FormikTouched } from 'formik';

// export  interface CommonStatusCheckProps {
//   edit?: boolean;
//   refresh?: any;
//   title?: string | undefined;
//   flyoutTitle?: string;
//   initialValues?: any;
//   validationSchema?: any;
//   fieledTypes?: any[];
//   tableDefinition?: any;
//   del?: boolean;
//   sampleFields?: any;
//   close?: any;
//   bulkUrl?: string | undefined;
//   packedData?: any;
//   setEdit?:any;
//   handleSubmit?: any;
//   setInitialValues?: any;
//   usersAndroles?: boolean;
//   setDelete?: any;
//   handleDelete?: any;
//   onPageChange?: any;
// globalFilters?: any;
// modalFields?: any;
// errorFields?: any;
  


//   onEdit?: any;
//   resetInitalForm?: any;
// }


export interface CommonStatusCheckProps {
  edit: boolean
  refresh: boolean
  title: string
  flyoutTitle: string
  initialValues: FormikValues
  validationSchema: any;
  fieledTypes: FieledType[]
  tableDefinition: TableDefinition[]
  del: boolean
  packedData: PackedData
  bulkUrl: string
  close: boolean
  sampleFields: string[]
  handleSubmit: (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  setEdit:  React.Dispatch<React.SetStateAction<boolean>>
  usersAndroles?: boolean;
  onPageChange: (newPage: number) => void
  setDelete: React.Dispatch<React.SetStateAction<boolean>>
  handleDelete: () => void
  setInitialValues: React.Dispatch<React.SetStateAction<any>>
  globalFilters?: any;
  modalFields?: any;
  errorFields?: any;
  onEdit?: any;

}
export interface FieledType {
  fieldName: string
  name: string
  required: boolean
  notEditable: boolean
  type?: string
  fieldType?: string
  options?:any
  isMulti?:any
  isRadio?:any
  placeholder?:string
}
export interface TableDefinition {
  header: string
  field: string
  placeholder: string
}

export interface PackedData {
  Data: any[]
  count: number | undefined;

  getData: any,
  onEdit:  (data: any) => void,
  onDelete: (data:any) => void,
  onPortalView?:  (data: any) => void
  onUpdate?:(values:any, setValues:  React.Dispatch<React.SetStateAction<any>>) => void,
  onRemoveFromList?: ((i: number, values: any, setValues:  React.Dispatch<React.SetStateAction<any>>) => void) | undefined,
}


export interface FormFeatureData {
  id: string
  name: string
  linkedFeature: string
  children?: FeatureName[]
}

export interface FeatureName {
  name: string
  id?:string
}


