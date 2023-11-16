import React, {useState } from "react";
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import { usePostZoopMutation}  from "../features/api";


const SendZoopDialog = () => {
    const [open, setOpen] = useState(false);
    const [zoopSent, setZoopSent] = useState(false);
    const [postZoop, { isLoading, isError, data }] = usePostZoopMutation();

    const navigate = useNavigate();

    return (
        <>
            <Tooltip 
                title="Send a Zoop"
            >
                <Fab
                    sx={{
                        position: "absolute",
                        bottom: 25,
                        right: 25
                    }}
                    onClick={() => setOpen(true)}
                > <SendIcon />
                </Fab>
            </Tooltip>

            {/* Render a success dialog if Zoop was sent and successfully integrated into DB,
                or an input dialog if Zoop has not yet been sent */}
            {zoopSent ? (
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Compose a Zoop</DialogTitle>
                    <DialogContent>
                        <DialogContentText> 
                            Zoop sent! 
                            <Link
                                component="button"
                                // TODO: Setup onClick={() => navigate('')} to go to Zoop's page.
                            > 
                                View your Zoop.
                            </Link>
                        </DialogContentText>

                    </DialogContent>
                </Dialog>
            ) : (
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
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            margin="dense"
                            label="Content"
                            type="text"
                            placeholder="e.g., Zoop is the new hotness."    
                        />    
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={() => {;
                                // TODO: redux action that adds Zoop to database
                            }}
                        >
                            Send Zoop
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            
        </>
    )
};

export default SendZoopDialog;