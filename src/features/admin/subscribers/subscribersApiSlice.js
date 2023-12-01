import { apiSlice } from "../../api/apiSlice";

const SUBS_URL = '/api/kbn/subscribers'

export const subscribersApiSliceAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Gets all subscribers
    getSubscribers: builder.query({
      query: () => (`${SUBS_URL}/`)
    }),
    // Delete a subscriber
    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `${SUBS_URL}/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {useGetSubscribersQuery, useDeleteSubscriberMutation} = subscribersApiSliceAdmin