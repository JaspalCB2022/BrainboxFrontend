import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, FEATURE_DELETE, FEATURE_GET, FEATURE_POST, FEATURE_UPDATE } from '../Constants';



// interface PFeature {
//   name:string,
//   children?:{
//     [key: string]: string;
// }[]
// }


export interface PFeature {
  id?: string
  name: string
  linkedFeature?: string
  children?:FeatureName[]
}

export interface FeatureName {
  name: string
}

interface GFeature{
    limit:number,
    skip: number,
    sortBy: string | undefined, 
    sortType: string | undefined, 
    search: string | undefined
  }

 

const featureApi = createApi({
  reducerPath:'featureapi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['feature'],
  endpoints: (builder) => ({
    
    getFeature: builder.mutation({
      query: (values:GFeature) => ({
        url: FEATURE_GET,
        method: 'POST',
        body: values,
        credentials: "include",
      }),
      invalidatesTags: ['feature'],
    }),

    createFeature: builder.mutation({
        query: (values:PFeature) => ({
          url: FEATURE_POST,
          method: 'POST',
          body: values,
          credentials: "include",
        }),
        invalidatesTags: ['feature'],
      }),

      updateFeature: builder.mutation({
        query: (values) => ({
          url: `${FEATURE_UPDATE}/${values._id}`,
          method: 'PUT',
          body: values,
          credentials: "include",
        }),
        invalidatesTags: ['feature'],
      }),

      deleteFeature: builder.mutation({
        query: (id) => ({
          url: `${FEATURE_DELETE}/${id}`,
          method: 'DELETE',
          credentials: "include",
        }),
        invalidatesTags: ['feature'],
      }),
  }),
});

export const {
useGetFeatureMutation,
useCreateFeatureMutation,
useUpdateFeatureMutation,
useDeleteFeatureMutation
} = featureApi;

export default featureApi;
