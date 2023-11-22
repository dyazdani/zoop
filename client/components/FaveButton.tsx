import React from "react";
import { Fave } from "@prisma/client";
import { ZoopWithDetails } from "../../src/types/custom";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type FaveButtonProps = {
  zoop: ZoopWithDetails
};

const FaveButton = ({ zoop }: FaveButtonProps) => {

  const handleClick = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  })
  
  return (
      <Button variant="outlined" onClick={(e) => handleClick(e)}>
        <Stack direction="row" alignItems="center">
          <StarBorderIcon />
          <Typography variant="body2">{zoop.faves.length}</Typography>
        </Stack>
      </Button>
  );
};

export default FaveButton;
