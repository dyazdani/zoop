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
      <Container maxWidth="md" sx={{ marginTop: 10}}>
        <Stack spacing={7}>
          {zoops.map((zoop) => {
            // TODO: import types from Prisma instead of src/types/custom.ts

            return (
              <ZoopListItem
                key={zoop.id}
                zoop={zoop}
              />
            );
          })}
        </Stack>
      </Container>
  ) : (
    <h1>No Zoops to show</h1>
  );
};

export default ZoopsList;