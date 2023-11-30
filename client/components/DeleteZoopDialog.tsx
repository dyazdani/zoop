import React, { useState } from "react";
import { ZoopWithDetails } from "../../src/types/custom";
import { useDeleteZoopMutation } from "../features/api";
import DeleteSnackBar from "./DeleteSnackBar";

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
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
  const [deleteZoop, { isLoading, isSuccess, isError, error }] =
    useDeleteZoopMutation();

  const handleDeleteZoop = () => {
    console.log("HELLOOOOO?????");
    setIsSuccessSnackbarOpen(true);
    deleteZoop(zoop.id);

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

        {isSuccessSnackbarOpen && (
        <DeleteSnackBar
          open={isSuccessSnackbarOpen}
          onClose={() => setIsSuccessSnackbarOpen(false)}
        />
        )}
      </Box>
    </>
  );
};

export default DeleteZoopDialog;
