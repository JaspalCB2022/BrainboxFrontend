export interface FormValues {
    email: string;
    password: string;
  }
  
  interface APIResponse {
    name: string;
    role: string;
    lastLoggedIn: string;
    token: string;
  }
  
  interface Response {
    data: APIResponse;
    success: boolean;
    error: (message: string) => void
  }
export  interface API {
    data: Response;
  }
  
export  interface APIToastPromise {
    loading: string;
    success: (data: API) => string;
    error: (err: Error) => string;
  }
  
  
  interface APIResponse {
    data: {
      name: string;
      role: string;
      lastLoggedIn: string;
      token: string;
    };
    success: boolean;
  }