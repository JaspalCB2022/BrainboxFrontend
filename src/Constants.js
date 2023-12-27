
export const ITEMS_PER_PAGE = 4
// export const BACKEND_URL = 'http://192.168.1.11:8000/'
export const BACKEND_URL = 'http://localhost:8000/'

// // commodity code
// export const COMMODITY_CODE = '/commoditycode'
// export const COMMODITY_CODE_GET = `${COMMODITY_CODE}/getCommoditycode`
// export const COMMODITY_CODE_POST = `${COMMODITY_CODE}/createCommoditycode`

// // currency code
// export const CURRENCY_CODE = '/currencycode'
// export const CURRENCY_CODE_GET = `${CURRENCY_CODE}/getCurrencycode`
// export const CURRENCY_CODE_POST = `${CURRENCY_CODE}/createCurrencycode`

// // company code
// export const COMPANY_CODE = '/companycode'
// export const COMPANY_CODE_GET = `${COMPANY_CODE}/getCompany`
// export const COMPANY_CODE_POST = `${COMPANY_CODE}/createCompanycode`

// // plant
// export const PLANT = '/plant'
// export const PLANT_GET = `${PLANT}/getPlants`
// export const PLANT_POST = `${PLANT}/createPlants`

// // UOM
// export const UOM = '/uom'
// export const UOM_GET = `${UOM}/getUom`
// export const UOM_POST = `${UOM}/createUom`


// // Purcahse Org.
// export const PO = '/purchaseOrg'
// export const PO_GET = `${PO}/getPurchaseOrganizations`
// export const PO_POST = `${PO}/createPurchaseOrganization`

// // Supplier
// export const SUPPLIER = '/supplier'
// export const SUPPLIER_GET = `${SUPPLIER}/getSuppliers`
// export const SUPPLIER_POST = `${SUPPLIER}/createSupplier`

// // Supplier
// export const ACESS_CONTROL = '/prAccess'
// export const ACESS_CONTROL_GET = `${ACESS_CONTROL}/getPrAccess`
// export const ACESS_CONTROL_POST = `${ACESS_CONTROL}/prAccess`

// // Country
// export const COUNTRY = '/country'
// export const COUNTRY_GET = `${COUNTRY}/getCountry`
// export const COUNTRY_POST = `${COUNTRY}/createCountry`

// // Invoice
// export const INVOICE = '/invoice'
// export const INVOICE_GET = `${INVOICE}/getInvoice`
// export const INVOICE_POST = `${INVOICE}/createInvoice`

// // User 
// export const USER = '/customer'
// export const USER_GET = `${USER}/getCustomers`
// export const USER_POST = `${USER}/create`
// export const USER_GET_SEARCH = `${USER}/getAllCustomerWithSearch`
// export const USER_GET_DEATAILS = `${USER}`
// export const USER_DELETE =`${USER}`
// export const USER_UPDATE =`${USER}/update`

// // Role 
// export const ROLE = '/customer/user/role'
// export const ROLE_GET = `${ROLE}`
// export const ROLE_POST = `${ROLE}/create`

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


export const userName = localStorage.getItem('userName')
export const tenantId = localStorage.getItem('tenantId')