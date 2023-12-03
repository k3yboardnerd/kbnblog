/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://kbnblog-api.onrender.com',
  credentials: 'include'
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Post', 'Comment', 'Subscriber', 'Donation', 'Message'],
  endpoints: (builder) => ({})
})
