import { FaveWithDetails } from "../../src/types/custom";
// import { Fave } from "@prisma/client";

import React from "react";

type FaveListItemProps = {
    fave: FaveWithDetails
}

const FaveListItem = ({ fave }: FaveListItemProps) =>  {
    return(
        <>
            <div>Faver: {fave.faver.username}</div>
        </>
    );
}

export default FaveListItem;