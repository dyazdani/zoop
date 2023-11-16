import { Fave } from "@prisma/client";
import React from "react";
import Zoop from "./Zoop";

type ZoopListItemProps = {
  zoopId: number;
  author: string;
  receiver: string;
  content: string;
  faves: Fave[];
  dateCreated: Date;
};

const ZoopListItem = ({
  zoopId,
  author,
  receiver,
  content,
  faves,
  dateCreated,
}: ZoopListItemProps) => {
  return (
    <>
        <Zoop 
          zoopId={zoopId}
          author={author}
          receiver={receiver}
          content={content}
          faves={faves}
          dateCreated={dateCreated}
        />
    </>
  );
};

export default ZoopListItem;
