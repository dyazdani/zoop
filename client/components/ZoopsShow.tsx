import React from "react";
import { useParams } from "react-router-dom";

const ZoopsShow = () => {
  const { id } = useParams();

    return(
        <>
            <div>This is the page for Zoop # {id}</div>
        </>
    )
}

export default ZoopsShow;