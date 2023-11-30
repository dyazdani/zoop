import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setSnackbar } from "../features/snackbarSlice"

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const DeleteSnackBar = () => {
  const snackbarOpen = useSelector(
    (state: RootState) => state.snackbar.snackbarOpen
  );
  const snackbarType = useSelector(
    (state: RootState) => state.snackbar.snackbarType
  );
  const snackbarMessage = useSelector(
    (state: RootState) => state.snackbar.snackbarMessage
  );
  const dispatch = useDispatch();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar({snackbarOpen: false, snackbarType, snackbarMessage}));
  };
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity={snackbarType} sx={{ width: "100%" }}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default DeleteSnackBar;
