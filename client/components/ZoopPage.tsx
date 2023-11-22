import React from "react";
import { useGetZoopQuery } from "../features/api";
import { useParams } from "react-router-dom";

type ZoopPageProps = {};

// TODO: string currently allowed to be undefined. allow?
const ZoopPage = (props: ZoopPageProps) => {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetZoopQuery(id);

  if (isLoading) {
    return <p>Loading Your Zoop...</p>;
  }

  if (isError) {
    return <p>Oops! Error loading Your Zoop :-(</p>;
  }

  const zoop = data?.zoop || undefined;
  console.log(zoop, "A ZOOP");

  return (
    <>
      <div>I am the ZoopPage component</div>
    </>
  );
};

export default ZoopPage;
