import React from "react";
import FaveButton from "./FaveButton";
import DeleteZoopButton from "./DeleteZoopButton";
import { ZoopWithDetails } from "../../src/types/custom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ButtonGroup from "@mui/material/ButtonGroup";

type ZoopProps = {
  zoop: ZoopWithDetails;
};
// TODO: import library to make dates more user friendly. Moment.js?
const ZoopDetails = ({ zoop }: ZoopProps) => {

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const dateCreated = new Date(zoop.dateCreated);
  const formattedDate = dateCreated.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <IconButton>
              <AccountCircle fontSize="large" />
            </IconButton>
            <Typography variant="h6">{zoop.author.username}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">- - - -</Typography>
            <SendIcon />
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">{zoop.receiver.username}</Typography>
            <IconButton>
              <AccountCircle fontSize="large" />
            </IconButton>
          </Stack>
        </Stack>
        <Card>
          <CardContent>
          {currentUser && currentUser.id === zoop.authorId && (
                <Stack direction="row" justifyContent="end">
                  <ButtonGroup>
                    <DeleteZoopButton zoop={zoop} />
                    </ ButtonGroup>
                </Stack>
              )}
            <Stack direction="row" justifyContent="center" alignItems="start">
              <Typography variant="body1">{zoop.content}</Typography>
            </Stack>
          </CardContent>
        </Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FaveButton zoop={zoop} />
          <Typography variant="body2">{formattedDate}</Typography>
        </Stack>
      </Stack>
  );
};

export default ZoopDetails;
