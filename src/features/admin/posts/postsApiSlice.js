import { apiSlice } from "../../api/apiSlice"

const POSTS_URL = '/api/kbn/posts'

export const postsApiSliceAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Gets all posts
    getAllPosts: builder.query({
      query: () => (`${POSTS_URL}/`)
    }),
    // Creates a new post
    createNewPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/`,
        method: 'POST',
        body: data
      })
    }),
    adminGetPostById: builder.query({
      query: (id) => (`${POSTS_URL}/${id}`),
      // providesTags: (result, error, id) => [{ type: 'Post', id }],
      // transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.error
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `${POSTS_URL}/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    adminDeletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "DELETE"
      })
    })
  })
})

export const {useGetAllPostsQuery, useCreateNewPostMutation, useAdminDeletePostMutation, useUpdatePostMutation, useAdminGetPostByIdQuery} = postsApiSliceAdmin