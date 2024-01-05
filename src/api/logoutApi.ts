import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, LOGOUT_POST } from '../Constants';

// interface AcessData {
//   email:string,
//   password:string;
// }

const logoutApi = createApi({
  reducerPath:'logoutapi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['logout'],
  endpoints: (builder) => ({
    getlogout: builder.mutation({
      query: () => ({
        url: LOGOUT_POST,
        method: 'POST',
        // body: values,
        credentials: "include",
      }),
      invalidatesTags: ['logout'],
    }),
  }),
});

export const {
  useGetlogoutMutation
} = logoutApi;

export default logoutApi;
