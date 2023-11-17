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
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";

type ZoopProps = {
  zoopId: number;
  author: string;
  receiver: string;
  content: string;
  faves: Fave[];
  dateCreated: Date;
};

const Zoop = ({
  zoopId,
  author,
  receiver,
  content,
  faves,
  dateCreated,
}: ZoopProps) => {
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
          <Stack direction="row" alignItems="center">
            <IconButton>
              <AccountCircle fontSize="large"/>
            </IconButton>
            <Typography variant="h6">{author}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">- - - -</Typography>
            <SendIcon />
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">{receiver}</Typography>
            <IconButton>
              <AccountCircle fontSize="large"/>
            </IconButton>
          </Stack>
        </Stack>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="center" alignItems="start">
              <Typography variant="body1">{content}</Typography>
            </Stack>
          </CardContent>
        </Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FaveButton zoopId={zoopId} faves={faves} />
          <Typography variant="body2">{formattedDate}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Zoop;
