import React from "react";
import FaveListItem from "./FaveListItem";
import { FaveWithDetails, ZoopWithDetails } from "../../src/types/custom";

import Stack from "@mui/material/Stack";

type FaveListProps = {
  zoop: ZoopWithDetails;
};
const FaveList = ({ zoop }: FaveListProps) => {
  return (
      <Stack alignItems="center" spacing={1} sx={{ marginTop: 10 }}>
        {zoop.faves.map((fave) => {
          return <FaveListItem fave={fave} key={fave.faverId} />;
        })}
      </Stack>
  );
};

export default FaveList;
