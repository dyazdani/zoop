import { Fave } from "@prisma/client";
import React from "react";
import Zoop from "./Zoop";

import Link from "@mui/material/Link";

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
    <Link href={`/zoops/${zoopId}`} color="inherit" underline="none">
      <Zoop
        zoopId={zoopId}
        author={author}
        receiver={receiver}
        content={content}
        faves={faves}
        dateCreated={dateCreated}
      />
    </Link>
  );
};

export default ZoopListItem;
