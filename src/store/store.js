import { configureStore } from '@reduxjs/toolkit'

import userReducer from 'src/store/slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})
