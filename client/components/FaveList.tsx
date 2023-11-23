import React from "react";
import FaveListItem from "./FaveListItem";
import { FaveWithDetails, ZoopWithDetails } from "../../src/types/custom";

type FaveListProps = {
  zoop: ZoopWithDetails;
};
const FaveList = ({ zoop }: FaveListProps) => {
  return (
    <>
      {zoop.faves.map((fave) => {
        return <FaveListItem fave={fave} key={fave.faverId} />;
      })}
    </>
  );
};

export default FaveList;
