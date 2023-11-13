import { Fave } from '@prisma/client';
import React from "react";

type ZoopListItemProps = {
    authorId: number,
    receiverId: number,
    content: string,
    faves: Fave[]
}

const ZoopListItem = ({ authorId, receiverId, content, faves}: ZoopListItemProps) =>  {
    return(
        <>
            <div>Author ID: {authorId}</div>
            <div>Receiver ID: {receiverId}</div>
            <div>{content}</div>
            <div>faves: {faves.length}</div>
        </>
    );
}

export default ZoopListItem;