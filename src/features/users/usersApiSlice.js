import { apiSlice } from "../api/apiSlice"

const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: 'POST',
        body: data
      })
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    updatePhoto: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/photo`,
        method: 'PUT',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),
    about: builder.query({
      query: () => (`${USERS_URL}/about`)
    })
  })
})

export const {useLoginMutation, useAboutQuery, useLogoutMutation, useRegisterMutation, useUpdateMutation, useUpdatePhotoMutation } = usersApiSlice