import React from "react";
import { Fave } from "@prisma/client";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type FaveButtonProps = {
  zoopId: number;
  faves: Fave[];
};

const FaveButton = ({ zoopId, faves }: FaveButtonProps) => {
  return (
      <Button variant="outlined">
        <Stack direction="row" alignItems="center">
          <StarBorderIcon />
          <Typography variant="body2">{faves.length}</Typography>
        </Stack>
      </Button>
  );
};

export default FaveButton;
