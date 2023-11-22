import React from "react";
import FaveButton from "./FaveButton";
import { ZoopWithDetails } from "../../src/types/custom";
import { RootState } from "../app/store";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import MoreButton from "./MoreButton";
import { useSelector } from 'react-redux';



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
    <>
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
              {/* TODO: Replace 4 in "currentUser.id === 4" with zoop.authorId. 4 is being used
              for testing because currently because cannot currently log into DB user accounts to 
              have auth for updating seeded Zoops */}
              {currentUser && currentUser.id === 4 && (
                <Stack direction="row" justifyContent="end">
                  <MoreButton 
                      zoopId={zoop.id}
                      authorId={zoop.authorId}
                      receiverId={zoop.receiverId}
                      content={zoop.content}
                  />
                </Stack>
              )}
              <Link
                to={`/zoops/${zoop.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Stack direction="row" justifyContent="center" alignItems="start">
                  <Typography variant="body1">{zoop.content}</Typography>
                </Stack>
              </Link>
            </CardContent>
          </Card>        
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FaveButton zoopId={zoop.id} faves={zoop.faves} />
          <Typography variant="body2">{formattedDate}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ZoopDetails;