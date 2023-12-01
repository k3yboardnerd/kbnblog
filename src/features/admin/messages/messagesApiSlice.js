import { apiSlice } from "../../api/apiSlice";

export const adminMessagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ('/api/kbn/messages/')
    })
  })
})

export const {useGetMessagesQuery} = adminMessagesApiSlice