import { Fave } from "@prisma/client";
import React from "react";
import Zoop from "./Zoop";

type ZoopListItemProps = {
  author: string;
  receiver: string;
  content: string;
  faves: Fave[];
  dateCreated: Date;
};

const ZoopListItem = ({
  author,
  receiver,
  content,
  faves,
  dateCreated,
}: ZoopListItemProps) => {
  return (
    <>
      <Zoop
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
