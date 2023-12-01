import {createSlice} from "@reduxjs/toolkit"

const initialState = [
  {
    id: 1,
    title: "My Second Post",
    author: "Loyiso Dlamini",
    category: "Tech",
    description: "HEY HEY"
  }
]
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.push(action.payload)
    }
  }
})

export const { addPost } = postsSlice.actions
export default postsSlice.reducer