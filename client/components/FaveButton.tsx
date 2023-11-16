import React from "react";
import { Fave } from "@prisma/client";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";


type FaveButtonProps = {
    zoopId: number
    faves: Fave[]
}

const FaveButton = ({faves}: FaveButtonProps) =>  {
    return(
        <>
            <Paper variant="outlined">
            <Stack direction="row" alignItems="center">
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <Typography variant="body2">{faves.length}</Typography>
            </Stack>
          </Paper>
        </>
    );
}

export default FaveButton;