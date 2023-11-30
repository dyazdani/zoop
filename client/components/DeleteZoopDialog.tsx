import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ZoopWithDetails } from "../../src/types/custom";
import { useDeleteZoopMutation } from "../features/api";
import DeleteSnackBar from "./DeleteSnackBar";
import { setSnackbar } from "../features/snackbarSlice";
import type { RootState } from "../app/store";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

type DeleteZoopDialogProps = {
  open: boolean;
  onClose: () => void;
  zoop: ZoopWithDetails;
};

const DeleteZoopDialog = ({ open, onClose, zoop }: DeleteZoopDialogProps) => {
  const dispatch = useDispatch();
  const snackbarOpen = useSelector(
    (state: RootState) => state.snackbar.snackbarOpen
  );
  const snackbarType = useSelector(
    (state: RootState) => state.snackbar.snackbarType
  );
  const snackbarMessage = useSelector(
    (state: RootState) => state.snackbar.snackbarMessage
  );
  // const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
  const [deleteZoop, { isLoading, isSuccess, isError, error }] =
    useDeleteZoopMutation();

  const handleDeleteZoop = () => {
    console.log("HELLOOOOO?????");
    // setIsSuccessSnackbarOpen(true);
    deleteZoop(zoop.id);
    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Zoop deleted!",
      })
    );
    onClose();

    if (isError) {
      console.error(error);
    }

    // if (isSuccess) {
    //   setIsSuccessSnackbarOpen(true);
    // }
  };

  return (
    <>
      <Box onClick={(e) => e.stopPropagation()}>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Delete Zoop</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to proceed? This action cannot be reversed
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={isLoading}
              variant="contained"
              endIcon={<DeleteIcon />}
              onClick={handleDeleteZoop}
            >
              Delete Zoop
            </Button>
          </DialogActions>
        </Dialog>

        {/* {isSuccessSnackbarOpen && ( */}
          {/* <DeleteSnackBar
          open={isSuccessSnackbarOpen}
          onClose={() => setIsSuccessSnackbarOpen(false)}
          /> */}
        {/* )} */}
      </Box>
    </>
  );
};

export default DeleteZoopDialog;
