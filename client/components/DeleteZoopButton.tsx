import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { ZoopWithDetails } from "../../src/types/custom";
import DeleteZoopDialog from "./DeleteZoopDialog";

import DeleteIcon from "@mui/icons-material/Delete";

type DeleteZoopButtonProps = {
  zoop: ZoopWithDetails;
};

const DeleteZoopButton = ({ zoop }: DeleteZoopButtonProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={(e) => {
          e.preventDefault();
          setIsDeleteDialogOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>

      <DeleteZoopDialog
        zoop={zoop}
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
};

export default DeleteZoopButton;
