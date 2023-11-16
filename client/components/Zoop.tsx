import React from "react";
import { useParams } from "react-router-dom";
import SendZoopDialog from "./SendZoopDialog";

const Zoop = () => {
  const { id } = useParams();

    return(
        <>
            <div>This is the page for Zoop # {id}</div>
            <SendZoopDialog />
        </>
    )
}

export default Zoop;