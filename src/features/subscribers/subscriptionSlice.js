import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  subscriberInfo: localStorage.getItem('subscriberInfo') ? JSON.parse(localStorage.getItem('subscriberInfo')) : null,

}

const subscriptionSlice = createSlice({
  name: 'subscriber',
  initialState,
  reducers: {
    setSubscriberInfo(state, action) {
      state.subscriberInfo = action.payload
      localStorage.setItem('subscriberInfo', JSON.stringify(action.payload))
    },
    removeSubscriber(state) {
      state.subscriberInfo = null
      localStorage.removeItem('subscriberInfo')
    }
  }
})

export const { setSubscriberInfo, removeSubscriber } = subscriptionSlice.actions
export default subscriptionSlice.reducer