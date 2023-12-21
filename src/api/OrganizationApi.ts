import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, ORGANIZATION_GET  } from '../Constants';
import Cookies from 'js-cookie';



interface GCustomer{
    slug:string,
  }

const organizationApi = createApi({
  reducerPath:'organizationapi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['portal'],
  endpoints: (builder) => ({
    
    getOrgabization: builder.mutation({
      query: (values:string) => ({
        url: `${ORGANIZATION_GET}/${values}`,
        method: 'GET',
        // body: values,
        credentials: "include",
    
      }),
      invalidatesTags: ['portal'],
    }),
  }),
});

export const {
    useGetOrgabizationMutation
   
} = organizationApi;

export default organizationApi;
