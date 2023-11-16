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
    tagTypes: ['CurrentUser', 'Zoop', 'Fave', 'User'],
    endpoints: (builder) => ({
      register: builder.mutation({
        query: ({ email, username, password }) => ({
          url: "users/register",
          method: "POST",
          body: { email, username, password },
        }),
        invalidatesTags: ["CurrentUser"],
      }),
      login: builder.mutation({
        query: ({ email, password }) => ({
          url: "users/login",
          method: "POST",
          body: { email, password },
        }),
        invalidatesTags: ["CurrentUser"],
      }),
      getAllZoops: builder.query<{zoops: Zoop[]}, void>({
        query: () => `/zoops`,
        providesTags: ['Zoop']
      }),
      postZoop: builder.mutation({
        query: ({content, authorId, receiverId}) => ({
          url: "/zoops",
          method: "POST",
          body: {content, authorId, receiverId},
        }),
        invalidatesTags: ["Zoop"],
      }),
      getAllUsers: builder.query<{users: User[]}, void>({
        query: () => `/users`,
        providesTags: ['User']
      }),
      getMe: builder.query<{user: User}, void>({
        query: () => `/users/me`,
        providesTags: ['CurrentUser']
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints

  export default api;
  
  export const { 
    useGetAllZoopsQuery, 
    useRegisterMutation,
    useLoginMutation,
    usePostZoopMutation,
    useGetAllUsersQuery,
    useGetMeQuery 
  } = api