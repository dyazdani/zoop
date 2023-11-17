import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import React, {
    useState,
} from "react";
import { useSelector } from "react-redux";

import { RootState} from "../app/store";
import SendZoopDialog from "./SendZoopDialog";
import ZoopSentDialog from "./ZoopSentDialog";
import { Zoop } from "../../src/types/custom";

const SendZoopButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Variable used for authorization
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <>
            {token && (
                <Fab
                    disabled={!token}
                    sx={{
                        position: "absolute",
                        top: 25,
                        right: 25
                    }}
                    onClick={() => setIsDialogOpen(true)}
                > <SendIcon />
                </Fab>
            )}


            {isDialogOpen && (
                <SendZoopDialog 
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
            
        </>
    )
};

export default SendZoopButton;