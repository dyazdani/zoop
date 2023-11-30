import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setSnackbar } from "../features/snackbarSlice"

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import Box from "@mui/material/Box";

// type SnackbarType = AlertColor | undefined;

// export interface DeleteSnackBarProps {
//   open: boolean;
//   onClose: () => void;
// }

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
    // event.preventDefault();
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar({snackbarOpen: false, snackbarType, snackbarMessage}));
  };
  return (
    // <Box
    //     onClick={(e) => {
    //         e.stopPropagation()
    //     }}
    // >
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    //   onClick={(e) => {
    //     e.preventDefault();
    //   }}
    >
      <MuiAlert onClose={handleClose} severity={snackbarType} sx={{ width: "100%" }}>
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
    // </Box>
  );
};

export default DeleteSnackBar;
