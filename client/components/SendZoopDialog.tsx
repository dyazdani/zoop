import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";

const SendZoopDialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Fab
            sx={{
                position: "absolute",
                bottom: 25,
                right: 25
            }}
            onClick={() => setOpen(true)}
        > <SendIcon />
        </Fab>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Compose a Zoop</DialogTitle>
            <DialogContent>
            </DialogContent>

        </Dialog>
        </>
        )
};

export default SendZoopDialog;