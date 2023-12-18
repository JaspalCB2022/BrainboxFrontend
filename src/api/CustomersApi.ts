import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, CUSTOMER_DELETE, CUSTOMER_GET, CUSTOMER_POST, CUSTOMER_UPDATE } from '../Constants';
import { APIResponse } from '../_organism/Pages/Customers';

interface AcessData {
  email:string,
  password:string;
}

interface ICustomer{
    limit:number,
    skip: number,
    sortBy: string | undefined, 
    sortType: string | undefined, 
    search: string | undefined
  }

const customerApi = createApi({
  reducerPath:'customerapi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['customer'],
  endpoints: (builder) => ({
    getCustomer: builder.mutation({
      query: (values:ICustomer) => ({
        url: CUSTOMER_GET,
        method: 'GET',
        // body: values,
        credentials: "include",
      }),
      invalidatesTags: ['customer'],
    //   transformResponse: (rawResult:APIResponse, meta) => {
    //     return rawResult
    //   },
    }),
    createCustomer: builder.mutation({
        query: (values:AcessData) => ({
          url: CUSTOMER_POST,
          method: 'POST',
          body: values,
          credentials: "include",
        }),
        invalidatesTags: ['customer'],
      }),
      updateCustomer: builder.mutation({
        query: (values:AcessData) => ({
          url: CUSTOMER_UPDATE,
          method: 'PUT',
          body: values,
          credentials: "include",
        }),
        invalidatesTags: ['customer'],
      }),
      deleteCustomer: builder.mutation({
        query: (values:AcessData) => ({
          url: CUSTOMER_DELETE,
          method: 'DELETE',
          body: values,
          credentials: "include",
        }),
        invalidatesTags: ['customer'],
      }),
  }),
});

export const {
    useGetCustomerMutation,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApi;

export default customerApi;
