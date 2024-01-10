  
export  interface DataResponse {
    id?: string 
    isEnabled?: boolean 
    name?: string 
    parentId?: null 
    tenantId?: string |null 
    createdAt?: string 
    updatedAt?: string 
    updatedBy?: string 
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
  
export  interface DAPI {
    data?: DResponse ;
    error?: { message: string }; 
  }


export interface Values {

}


export interface Feature {
  _id: string
  isEnabled: boolean
  name: string
  parentId: string | null
  tenantId: string | null
  createdAt: string
  updatedAt: string
}


export interface FeatureData {
  _id: string
  isEnabled: boolean
  name: string
  parentId: string | null
  tenantId:string | null
  createdAt: string
  updatedAt: string
  children: Feature[]
  srno: number
  linkedFeature: string
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

