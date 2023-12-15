import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, LOGIN_GET } from '../Constants';

interface AcessData {
  email:string,
  password:string;
}

const loginApi = createApi({
  reducerPath:'loginapi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['login'],
  endpoints: (builder) => ({
    getlogin: builder.mutation({
      query: (values:AcessData) => ({
        url: LOGIN_GET,
        method: 'POST',
        body: values,
        credentials: "include",
      }),
      invalidatesTags: ['login'],
    }),
  }),
});

export const {
  useGetloginMutation
} = loginApi;

export default loginApi;
