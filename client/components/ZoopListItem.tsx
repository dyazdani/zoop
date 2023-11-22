import React from "react";
import ZoopDetails from "./ZoopDetails";
import { ZoopWithDetails } from "../../src/types/custom";

type ZoopListItemProps = {
  zoop: ZoopWithDetails;
};

const ZoopListItem = ({ zoop }: ZoopListItemProps) => {

    return (
        <ZoopDetails zoop={zoop} />
    )
};

export default ZoopListItem;
