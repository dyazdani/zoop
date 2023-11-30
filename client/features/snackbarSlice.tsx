import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../src/types/custom'
// import type { RootState } from '../app/store'
// import { api } from './api'

interface AuthState {
  snackbarOpen: boolean
  snackbarType: string
  snackbarMessage: string
}

const initialState: AuthState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: ""
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, action) => {
        const { snackbarMessage, snackbarType } = action.payload;
        state.snackbarOpen = true;
        state.snackbarType = snackbarType;
        state.snackbarMessage = snackbarMessage
    }
  }
})


export default snackbarSlice.reducer

// export const selectCurrentUser = (state: RootState) => state.auth.user