import React from "react";
import { useGetAllZoopsQuery } from "../features/api";
import ZoopListItem from "./ZoopListItem";

const ZoopsList = () => {
  const { data, isLoading, isError } = useGetAllZoopsQuery();

  if (isLoading) {
    return <p>Loading Zoops...</p>;
  }

  if (isError) {
    return <p>Oops! Error loading Zoops :-(</p>;
  }
  

  const zoops = data?.zoops || [];

  return zoops.length ? (
    <>
      <h1>Zoops</h1>

      {zoops.map((zoop) => {
        // TODO: import types from Prisma instead of src/types/custom.ts
        return (
          <ZoopListItem
            key={zoop.id}
            authorId={zoop.authorId}
            author={zoop.author.username}
            receiverId={zoop.receiverId}
            receiver={zoop.receiver.username}
            content={zoop.content}
            faves={zoop.faves}
            dateCreated={zoop.dateCreated}
          />
        );
      })}
    </>
  ) : (
    <h1>No Zoops to show</h1>
  );
};

export default ZoopsList;
