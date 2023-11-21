import React from "react";
import ZoopDetails from "./ZoopDetails";
import { Link } from "react-router-dom";
import { ZoopWithDetails } from "../../src/types/custom";

type ZoopListItemProps = {
  zoop: ZoopWithDetails;
};

const ZoopListItem = ({ zoop }: ZoopListItemProps) => {
  return (
    <Link to={`/zoops/${zoop.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <ZoopDetails zoop={zoop} />
    </Link>
  );
};

export default ZoopListItem;
