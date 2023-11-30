import { createSlice } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material'

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