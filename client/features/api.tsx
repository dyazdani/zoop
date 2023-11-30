import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Zoop, Fave, User, ZoopWithDetails} from '../../src/types/custom'
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
      getAllZoops: builder.query<{zoops: ZoopWithDetails[]}, void>({
          query: () => `/zoops`,
          providesTags: ['Zoop']
      }),
      getZoop: builder.query<{zoop: ZoopWithDetails}, string>({
        query: (id) => `/zoops/${id}`,
        providesTags: ["Zoop"]
      }),
      sendZoop: builder.mutation<{zoop: Zoop}, {content: string, authorId: number, receiverId: number}>({
        query: ({content, authorId, receiverId}) => ({
          url: "/zoops",
          method: "POST",
          body: {content, authorId, receiverId},
        }),
        invalidatesTags: ["Zoop"],
      }),
      deleteZoop: builder.mutation<{zoop: Zoop}, number>({
        query: (id) => ({
          url: `/zoops/${id}`,
          method: "DELETE"
        }),
        invalidatesTags: ["Zoop"],
      }), 
      getAllUsers: builder.query<{users: {user: User}[]}, void>({
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
    useGetZoopQuery, 
    useRegisterMutation,
    useLoginMutation,
    useSendZoopMutation,
    useDeleteZoopMutation,
    useGetAllUsersQuery,
    useGetMeQuery 
  } = api