import { configureStore } from "@reduxjs/toolkit"
// import postsReducer from "../features/posts/postsSlice"
// import bookmarksReducer from "../features/bookmarks/bookmarksSlice"
// import highlightsReducer from "../features/highlights/highlightsSlice"
// import mobileNavReducer from "../features/navigator/mobileNavSlice"
// import desktopNavReducer from "../features/navigator/desktopNavSlice"
// import commentReducer from "../features/comments/commentSlice"
import authReducer from "../features/users/authSlice"
import subscribersReducer from "../features/subscribers/subscriptionSlice"
import { apiSlice } from "../features/api/apiSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscriber: subscribersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})