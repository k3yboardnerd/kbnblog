import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: undefined,
  comment: undefined
} // {id, text}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    editComment(state, action) {
      state = {
        id: action?.payload.id,
        comment: action?.payload.comment
      }
    }
  }
})

export const { editComment } = commentSlice.actions
export default commentSlice.reducer