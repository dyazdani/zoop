import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Zoop, Fave, User} from '../../src/types/custom'
import { RootState } from '../app/store';

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api', 
        prepareHeaders: (headers: Headers, { getState }) => {
          const token = (getState() as RootState).auth.token;
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
      }),
      tagTypes: ['CurrentUser', 'Zoop', 'Fave'],
      endpoints: (builder) => ({
        register: builder.mutation({
          query: ({ email, username, password }) => ({
            url: "users/register",
            method: "POST",
            body: { email, username, password },
          }),
          invalidatesTags: ["CurrentUser"],
        }),
        getAllZoops: builder.query<{zoops: Zoop[]}, void>({
          query: () => `/zoops`,
          providesTags: ['Zoop']
        }),
      }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { 
    useGetAllZoopsQuery, 
    useRegisterMutation 
  } = api