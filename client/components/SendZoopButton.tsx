import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import React, {
    useState,
} from "react";
import { useSelector } from "react-redux";

import { RootState} from "../app/store";
import SendZoopDialog from "./SendZoopDialog";

const SendZoopButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Variable used for authorization
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return null
    }

    return (
        <>
            {token && (
                <Button
                    disabled={!token}
                    variant="contained"
                    sx={{
                        position: "absolute",
                        top: 25,
                        right: 25
                    }}
                    onClick={() => setIsDialogOpen(true)}
                >Send Zoop  ----<SendIcon />
                </Button>
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