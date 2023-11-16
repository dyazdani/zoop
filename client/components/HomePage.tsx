import React from "react";
import ZoopList from './ZoopList'
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";

const HomePage = () => {
    return(
        <>
            <div>I am the Home Page</div>
            <ZoopList />
            <Fab
                sx={{
                    position: "absolute",
                    bottom: 25,
                    right: 25
                }}
                // TODO: Set up onClick={}
            > <SendIcon />

            </Fab>
        </>
    )
}

export default HomePage;