import React from "react";
import { useGetAllZoopsQuery } from "../features/api";
import ZoopListItem from "./ZoopListItem";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const ZoopsList = () => {
  const { data, isLoading, isError } = useGetAllZoopsQuery();

  if (isLoading) {
    return <p>Loading Zoops...</p>;
  }

  if (isError) {
    return <p>Oops! Error loading Zoops :-(</p>;
  }

  const zoops = data?.zoops || [];
  console.log(zoops, "ZOOPS");

  return zoops.length ? (
    <>
      <h1>Zoops</h1>
      <Container maxWidth="md">
        <Stack spacing={5}>
          {zoops.map((zoop) => {
            // TODO: import types from Prisma instead of src/types/custom.ts

            return (
              <ZoopListItem
                key={zoop.id}
                author={zoop.author.username}
                receiver={zoop.receiver.username}
                content={zoop.content}
                faves={zoop.faves}
                dateCreated={zoop.dateCreated}
              />
            );
          })}
        </Stack>
      </Container>
    </>
  ) : (
    <h1>No Zoops to show</h1>
  );
};

export default ZoopsList;
