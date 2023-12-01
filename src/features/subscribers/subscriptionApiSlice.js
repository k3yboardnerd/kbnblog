import { apiSlice } from "../api/apiSlice";

const SUBSCRIBER_URL = '/api/subs'

export const subscriberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (data) => ({
        url: `${SUBSCRIBER_URL}/`,
        method: 'POST',
        body: data
      })
    }),
    unsubscribe: builder.mutation({
      query: (id) => ({
        url: `${SUBSCRIBER_URL}/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {useSubscribeMutation, useUnsubscribeMutation} = subscriberApiSlice