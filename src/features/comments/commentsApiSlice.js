import { apiSlice } from "../api/apiSlice";

const COMMENTS_URL = "api/comments"

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (id) => ({
        url: `${COMMENTS_URL}/${id}`
      })
    }),
    // getCommentById: builder.query({
    //   query: (id) => ({
    //     url: `/${COMMENTS_URL}/comment/${id}`
    //   })
    // }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/`,
        method: 'POST',
        body: data
      })
    }),
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `${COMMENTS_URL}/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `${COMMENTS_URL}/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const { useGetCommentsQuery, useGetCommentByIdQuery, useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } = commentsApiSlice