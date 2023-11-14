import { Fave } from "@prisma/client";
import React from "react";

type ZoopListItemProps = {
  authorId: number;
  author: string;
  receiverId: number;
  receiver: string;
  content: string;
  faves: Fave[];
  dateCreated: Date;
};

const ZoopListItem = ({
  authorId,
  author,
  receiverId,
  receiver,
  content,
  faves,
  dateCreated,
}: ZoopListItemProps) => {
  const date = new Date(dateCreated);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <div>Author ID: {authorId}</div>
      <div>Author: {author}</div>
      <div>Receiver ID: {receiverId}</div>
      <div>Receiver: {receiver}</div>
      <div>{content}</div>
      <div>faves: {faves.length}</div>
      <div>{formattedDate}</div>
    </>
  );
};

export default ZoopListItem;
