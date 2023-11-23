import React from "react";
import { useGetZoopQuery } from "../features/api";
import { useParams } from "react-router-dom";
import ZoopDetails from "./ZoopDetails";
import { skipToken } from "@reduxjs/toolkit/query";
import FaveList from "./FaveList";

import Container from "@mui/material/Container";

type ZoopPageProps = {};

const ZoopPage = (props: ZoopPageProps) => {
  const { id } = useParams();

  const { isLoading, isError, data } = useGetZoopQuery(id ?? skipToken);

  if (isLoading) {
    return <p>Loading Your Zoop...</p>;
  }

  if (isError) {
    return <p>Oops! Error loading Your Zoop :-(</p>;
  }

  console.log(data, "THE DATA");
  const zoop = data?.zoop;
  console.log(zoop, "A ZOOP");

  return (
    zoop && (
      <>
        <Container maxWidth="lg" sx={{ marginTop: 10}}>
          <ZoopDetails zoop={zoop} />
        </Container>
        <Container maxWidth="sm" sx={{ marginTop: 10}}>
          <FaveList zoop={zoop} />
        </Container>
      </>
    )
  );
};

export default ZoopPage;
