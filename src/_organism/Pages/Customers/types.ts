
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
  
export  interface PAPI {
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
  
export   interface DAPI {
    data?: DResponse ;
    error?: { message: string }; 
  }

  export interface CustomerData {
    id: string
    tenantId: string
    organizationName: string
    slug: string
    createdAt: string
    updatedAt: string
    isActive: boolean
    srno: number
  }

  export interface Customer {
    id: string
    tenantId: string
    organizationName: string
  }