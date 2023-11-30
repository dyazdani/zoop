import React, { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export interface DeleteSnackBarProps {
  open: boolean;
  onClose: () => void;
}

const DeleteSnackBar = ({ open, onClose }: DeleteSnackBarProps) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event.preventDefault();
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };
  return (
    // <Box
    //     onClick={(e) => {
    //         e.stopPropagation()
    //     }}
    // >
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <MuiAlert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Zoop deleted!
      </MuiAlert>
    </Snackbar>
    // </Box>
  );
};

export default DeleteSnackBar;
