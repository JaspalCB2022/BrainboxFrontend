import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL, LOGIN_GET } from '../Constants';

interface AcessData {
  email:string,
  password:string;
}

const loginApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['login'],
  endpoints: (builder) => ({
    getlogin: builder.mutation<AcessData, AcessData>({
      query: (values) => ({
        url: LOGIN_GET,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['login'],
    }),
  }),
});

export const {
  useGetloginMutation
} = loginApi;

export default loginApi;
