import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, CUSTOMER_DELETE, CUSTOMER_GET, CUSTOMER_POST, CUSTOMER_UPDATE } from '../Constants';

interface PostCustomer {
  // id:string,
  orginationName: string,
  tenantId:string 
}
interface GetCustomer{
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
      query: (values:GetCustomer) => ({
        url: CUSTOMER_GET,
        method: 'POST',
        body: values,
        credentials: "include",
      }),
      invalidatesTags: ['customer'],
    }),

    createCustomer: builder.mutation({
        query: (values:PostCustomer) => ({
          url: CUSTOMER_POST,
          method: 'POST',
          body: values,
          credentials: "include",
        }),
        invalidatesTags: ['customer'],
      }),

      updateCustomer: builder.mutation({
        query: (values) => ({
          url: `${CUSTOMER_UPDATE}/${values.id}`,
          method: 'PUT',
          body: values,
          credentials: "include",
        }),
        invalidatesTags: ['customer'],
      }),

      deleteCustomer: builder.mutation({
        query: (id) => ({
          url: `${CUSTOMER_DELETE}/${id}`,
          method: 'DELETE',
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
