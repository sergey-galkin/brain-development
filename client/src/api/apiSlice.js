import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  tagTypes: ['auth'],
  endpoints: builder => ({
    identification: builder.query({
      query: () => '/identification',
      providesTags: ['auth']
    }),
    registration: builder.mutation({
      query: regData => ({
        url: '/registration',
        method: 'post',
        body: regData
      })
    }),
    authentication: builder.mutation({
      query: authData => ({
        url: '/authentication',
        method: 'post',
        body: authData
      }),
      transformResponse: res => {
        return res.status ? {login: res.login} : null;
      },
      invalidatesTags: ['auth']
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'post',
      }),
      invalidatesTags: ['auth']
    }),
  })
})

export const {
  useIdentificationQuery,
  useRegistrationMutation,
  useAuthenticationMutation,
  useLogoutMutation
} = apiSlice
