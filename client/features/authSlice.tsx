import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../src/types/custom'
import type { RootState } from '../app/store'
import { api } from './api'

type AuthState = {
  user: User | null
  token: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
      }
    )
  }
})


export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user

