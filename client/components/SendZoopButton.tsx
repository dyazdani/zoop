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
    const [open, setOpen] = useState(false);
    const [isZoopSent, setIsZoopSent] = useState(false);
    const [sentZoop, setSentZoop] = useState<Zoop | null>(null)

    // Variable used for authorization
    const token = useSelector((state: RootState) => state.auth.token);

    const handleSetSentZoop = (zoop: Zoop) => {
        setSentZoop(zoop);
    }

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
                    onClick={() => setOpen(true)}
                > <SendIcon />
                </Fab>
            )}


            {open && (
                <SendZoopDialog 
                    openDialog={open}
                    isZoopSent={() => setIsZoopSent(true)}
                    sentZoop={handleSetSentZoop}
                />
            )}
            
            {isZoopSent && (
                <ZoopSentDialog
                    isZoopSent={isZoopSent}
                    sentZoop={sentZoop}
                />
            )}
            
        </>
    )
};

export default SendZoopButton;