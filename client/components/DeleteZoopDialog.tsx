import React from "react";
import { ZoopWithDetails } from "../../src/types/custom";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

type DeleteZoopDialogProps = {
  open: boolean;
  onClose: () => void;
  zoop: ZoopWithDetails;
};

const DeleteZoopDialog = ({ open, onClose, zoop }: DeleteZoopDialogProps) => {
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
        </Dialog>
      </Box>
    </>
  );
};

export default DeleteZoopDialog;
