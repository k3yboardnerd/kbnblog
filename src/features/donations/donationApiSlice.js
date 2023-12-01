import { apiSlice } from "../api/apiSlice";

export const donationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    donate: builder.mutation({
      query: (data) => ({
        url: `/api/donation/`,
        method: "POST",
        body: data
      })
    })
  })
})

export const {useDonateMutation} = donationApiSlice