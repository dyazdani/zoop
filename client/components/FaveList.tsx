import React from "react";
import FaveListItem from "./FaveListItem";
import { ZoopWithDetails } from "../../src/types/custom";

// import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

type FaveListProps = {
  zoop: ZoopWithDetails;
};

const FaveList = ({ zoop }: FaveListProps) => {
  
  return (
    <List disablePadding={true}>
      {zoop.faves.map((fave) => {
        return (
          <ListItem>
            <FaveListItem fave={fave} key={fave.faverId} />;
          </ListItem>
        );
      })}
    </List>
  );
};

export default FaveList;
