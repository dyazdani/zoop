import { Fave } from '@prisma/client';
import React from "react";

type ZoopListItemProps = {
    authorId: number,
    author: string,
    receiverId: number,
    receiver: string,
    content: string,
    faves: Fave[]
}

const ZoopListItem = ({ authorId, author, receiverId, receiver, content, faves}: ZoopListItemProps) =>  {
    return(
        <>
            <div>Author ID: {authorId}</div>
            <div>Author: {author}</div>
            <div>Receiver ID: {receiverId}</div>
            <div>Receiver: {receiver}</div>
            <div>{content}</div>
            <div>faves: {faves.length}</div>
        </>
    );
}

export default ZoopListItem;