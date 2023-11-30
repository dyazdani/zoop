import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../src/types/custom'
import { AlertColor } from '@mui/material'
// import type { RootState } from '../app/store'
// import { api } from './api'

interface AuthState {
  snackbarOpen: boolean
  snackbarType: AlertColor | undefined
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
    setSnackbar: (state, { payload }) => {
        const { snackbarOpen, snackbarMessage, snackbarType } = payload;
        state.snackbarOpen = snackbarOpen;
        state.snackbarType = snackbarType;
        state.snackbarMessage = snackbarMessage
    }
  }
})

export const { setSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer

// export const selectCurrentUser = (state: RootState) => state.auth.user