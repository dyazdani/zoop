import { Fave } from "@prisma/client";
import React from "react";

// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
// import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

type ZoopListItemProps = {
  author: string;
  receiver: string;
  content: string;
  faves: Fave[];
  dateCreated: Date;
};

const ZoopListItem = ({
  author,
  receiver,
  content,
  faves,
  dateCreated,
}: ZoopListItemProps) => {
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
            <Stack direction="row" justifyContent="space-around">
              <IconButton>
                <AccountBoxIcon sx={{ fontSize: 40 }}/>
              </IconButton>
              <Typography variant="body1">{content}</Typography>
              <IconButton>
                <AccountBoxIcon sx={{ fontSize: 40 }}/>
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row" justifyContent="space-between">
          <Paper variant="outlined">
            <Stack direction="row" alignItems="center">
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <Typography variant="body2">{faves.length}</Typography>
            </Stack>
          </Paper>
          <Typography variant="body2">{formattedDate}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ZoopListItem;
