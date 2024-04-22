import { configureStore } from '@reduxjs/toolkit'
import togglePostModal from '../store/modalToggle'
// ...

export const store = configureStore({
  reducer: {
    postModal: togglePostModal
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch