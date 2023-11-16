import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
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
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Recipient"
                    type="text"
                    placeholder="Username"    
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Content"
                    type="text"
                    placeholder="e.g., Zoop is the zoopiest of all apps."    
                />    
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => {
                        setOpen(false);
                        // TODO: redux action that adds Zoop to database
                    }}
                >
                    Send Zoop
                </Button>
            </DialogActions>
        </Dialog>
        </>
        )
};

export default SendZoopDialog;