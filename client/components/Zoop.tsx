import React from "react";
import { Fave } from "@prisma/client";
import FaveButton from "./FaveButton";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Stack from "@mui/material/Stack";

type ZoopProps = {
  zoopId: number;
  author: string;
  receiver: string;
  content: string;
  faves: Fave[];
  dateCreated: Date;
};

const Zoop = ({ zoopId, author, receiver, content, faves, dateCreated }: ZoopProps) => {
  const date = new Date(dateCreated);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">{author}</Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">- - - -</Typography>
            <SendIcon />
          </Stack>
          <Typography variant="h6">{receiver}</Typography>
        </Stack>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <IconButton>
                <AccountBoxIcon sx={{ fontSize: 100 }} />
              </IconButton>
              <Typography variant="body1">{content}</Typography>
              <IconButton>
                <AccountBoxIcon sx={{ fontSize: 100 }} />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <FaveButton zoopId={zoopId} faves={faves} />
          <Typography variant="body2">{formattedDate}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Zoop;
