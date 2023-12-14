import { configureStore } from '@reduxjs/toolkit';
// import commodityApi from './commodityApi';
// import currencyApi from './currencyApi';
// import companyApi from './companyApi';
// import plantApi from './plantApi';
// import uomApi from './uomApi';
// import poApi from './poApi';
// import supplierApi from './supplierApi';
// import acessApi from './acessApi';
// import reducers from '../_store/reducers/reducers';

export const store = configureStore({
  reducer: {
    // commodityData: commodityApi.reducer,
    // currencyData: currencyApi.reducer,
    // companyData: companyApi.reducer,
    // plant: plantApi.reducer,
    // uom: uomApi.reducer,
    // po: poApi.reducer,
    // supplier: supplierApi.reducer,
    // acess: acessApi.reducer,
    // reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    //   commodityApi.middleware,
    //   currencyApi.middleware ,
    //   companyApi.middleware ,
    //   plantApi.middleware,
    //   uomApi.middleware,
    //   poApi.middleware,
    //   supplierApi.middleware,
    //   acessApi.middleware,
    ),
});

export default store;
