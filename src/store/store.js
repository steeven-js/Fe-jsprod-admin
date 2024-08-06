import { configureStore } from '@reduxjs/toolkit'

import userReducer from 'src/store/slices/userSlice';
import blogReducer from 'src/store/slices/blogSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
})
