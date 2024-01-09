
export const ITEMS_PER_PAGE = 8
// export const BACKEND_URL = 'http://192.168.1.11:8000/'
export const BACKEND_URL = 'http://localhost:8000/'

// Login 
export const LOGIN = '/api/admin'
export const LOGIN_GET = `${LOGIN}/login`

//customer
export const CUSTOMER = '/api/customer'
export const CUSTOMER_GET = `${CUSTOMER}/list`
export const CUSTOMER_POST = `${CUSTOMER}/create`
export const CUSTOMER_UPDATE = `${CUSTOMER}/update`
export const CUSTOMER_DELETE = `${CUSTOMER}/delete`

//organization
export const ORGANIZATION ='api/customer'
export const ORGANIZATION_GET =`${ORGANIZATION}/org`

//feature
export const FEATURE = 'api/feature' 
export const FEATURE_GET = `${FEATURE}`
export const FEATURE_POST = `${FEATURE}/create`
export const FEATURE_UPDATE = `${FEATURE}/update`
export const FEATURE_DELETE = `${FEATURE}/delete`

//logout
export const LOGOUT = '/api/admin'  
export const LOGOUT_POST = `${LOGOUT}/logout`

export const userName = localStorage.getItem('userName')
export const tenantId = localStorage.getItem('tenantId')