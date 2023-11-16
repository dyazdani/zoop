import { Fave } from "@prisma/client";
import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
// import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

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
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between">
          <Typography>{author}</Typography>
          <SendIcon />
          <Typography>{receiver}</Typography>
        </Stack>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-around">
              <IconButton>
                <AccountBoxIcon />
              </IconButton>
              <Typography>{content}</Typography>
              <IconButton>
                <AccountBoxIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row" justifyContent="space-between">
          <Box
            sx={{
              border: "1px solid black",
              maxWidth: "2.5rem",
              borderRadius: "3px",
            }}
          >
            <Stack direction="row">
              <StarBorderIcon />
              <Typography>{faves.length}</Typography>
            </Stack>
          </Box>
          <Typography>{formattedDate}</Typography>
        </Stack>
      </Container>
    </>
  );
};

export default ZoopListItem;
