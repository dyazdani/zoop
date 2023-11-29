import React from "react";
import { FaveWithDetails } from "../../src/types/custom";

import Stack from "@mui/material/Stack";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type FaveListItemProps = {
  fave: FaveWithDetails;
};

const FaveListItem = ({ fave }: FaveListItemProps) => {
  // TODO: Import library to format dates
  const dateCreated = new Date(fave.dateCreated);
  const formattedDate = dateCreated.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent="space-between">
        <StarBorderIcon />
        <Typography>{fave.faver.username} faved this</Typography>
        <Typography>{formattedDate}</Typography>
      </Stack>
    </Box>
  );
};

export default FaveListItem;
