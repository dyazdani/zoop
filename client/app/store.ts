import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';

import authSliceReducer from '../features/authSlice';
import zoopSliceReducer from '../features/zoopSlice';

import api from '../features/api'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authSliceReducer,
        zoop: zoopSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
