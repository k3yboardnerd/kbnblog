import { apiSlice } from "../api/apiSlice";

const POSTS_URL = 'api/posts'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => (`${POSTS_URL}/`)
    }),
    getPostById: builder.query({
      query: (params) => (`${POSTS_URL}/${params.postId}/${params.subId}`),
      // providesTags: (result, error, id) => [{ type: 'Post', id }],
      // transformResponse: (response) => response.data,
      // transformErrorResponse: (response) => response.error
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/`,
        method: 'POST',
        body: data
      })
    }),
    updatePost: builder.mutation({
      query: ({id, data}) => ({
        url: `/${POSTS_URL}/${id}/edit`,
        method: 'PUT',
        body: data
      })
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${POSTS_URL}/${id}`,
        method: "DELETE"
      })
    })
  })
})

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApiSlice