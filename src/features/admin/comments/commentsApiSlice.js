import { apiSlice } from "../../api/apiSlice";

const COMMENTS_URL = "/api/kbn/comments"

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminGetComments: builder.query({
      query: (id) => ({
        url: `${COMMENTS_URL}/${id}`,
        method: 'GET'
      })
    }),
    adminDeleteComment: builder.mutation({
      query: (id) => ({
        url: `${COMMENTS_URL}/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useAdminDeleteCommentMutation, useAdminGetCommentsQuery } = commentsApiSlice