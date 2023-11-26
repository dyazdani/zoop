import React from "react";
import { useGetAllZoopsQuery } from "../features/api";
import ZoopListItem from "./ZoopListItem";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useGetAllZoopsQuery } from "../features/api";
import ZoopListItem from "./ZoopListItem";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const ZoopsList = () => {
  const {data, isLoading, error } = useGetAllZoopsQuery() 

  if (isLoading) {
    return <p>Loading Zoops...</p>;
  }

  if (error) {
    return <p>Oops! Error loading Zoops :-(</p>
  }

  const zoops = data?.zoops || [];
  console.log(zoops, "ZOOPS");

  return zoops.length ? (
    <>
      <h1>Zoops</h1>
      <ul>
        {zoops.map(zoop => {
      return (
        <li>Zoop ID #{zoop.id}</li>
        )
      })}
      </ul>
    </>
  ) : (
    <h1>No Zoops to show</h1>
  );
};

export default ZoopsList;