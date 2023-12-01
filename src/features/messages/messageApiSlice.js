import { apiSlice } from "../api/apiSlice";


export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `/api/messages`,
        method: 'POST',
        body: data
      })
    })
  })
})

export const {useSendMessageMutation} = messagesApiSlice