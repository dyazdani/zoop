import React from "react";
import { useGetAllZoopsQuery } from "../features/api";
import ZoopListItem from "./ZoopListItem";

const ZoopsList = () => {
  const { data, isLoading, error } = useGetAllZoopsQuery();

  if (isLoading) {
    return <p>Loading Zoops...</p>;
  }

  if (error) {
    return <p>Oops! Error loading Zoops :-(</p>;
  }

  const zoops = data?.zoops || [];

  return zoops.length ? (
    <>
      <h1>Zoops</h1>

      {zoops.map((zoop) => {
        return (
          <ZoopListItem
            key={zoop.id}
            authorId={zoop.authorId}
            receiverId={zoop.receiverId}
            content={zoop.content}
            faves={zoop.faves}
          />
        );
      })}
    </>
  ) : (
    <h1>No Zoops to show</h1>
  );
};

export default ZoopsList;
