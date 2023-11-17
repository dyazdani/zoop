import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { 
    useGetAllUsersQuery, 
    useGetMeQuery, 
    useSendZoopMutation 
} from "../features/api";
import { Zoop } from "../../src/types/custom";
import ZoopSentDialog from "./ZoopSentDialog";
import { RootState } from "../app/store";

export interface SendZoopDialogProps {
    open: boolean
    onClose: () => void
}

const SendZoopDialog = ({open, onClose}: SendZoopDialogProps) => {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [sendZoop, { isLoading: isSendZoopLoading, isError, data: zoopData, error: zoopError }] = useSendZoopMutation();
    const {data: usersData, isLoading: isGetAllUsersLoading, error: userError } = useGetAllUsersQuery(); 

    if (userError) {
        console.error(userError);
    }

    if (zoopError) {
        console.error(zoopError);
    }

    if (zoopData) {
        console.log(zoopData);
    }

    const handleSendZoopClick = () => {
        if (!isGetAllUsersLoading && !usersData) {
            throw new Error('No users to send Zoop to');
        } else if (!isGetAllUsersLoading && usersData) {
            const [recipient] = usersData.users.filter(el => el.user.username === username);
            if (recipient && currentUser) {
                sendZoop({
                    content: content,
                    authorId: currentUser.id,
                    receiverId: recipient.user.id
                })
            } else {
                throw new Error('No such user exists. Please select a different username');
            }  
        }  
    }

    if (zoopData) {
        return (
            <ZoopSentDialog
                sentZoop={zoopData.zoop}
                onClose={onClose}
            />
        )
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Send Zoop</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Recipient"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}    
                />
                <TextField
                    required
                    fullWidth
                    multiline
                    minRows={5}
                    margin="dense"
                    label="Content"
                    type="text"
                    placeholder="What do you want to say?"  
                    onChange={(e) => setContent(e.target.value)}
                    value={content}    
                />    
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSendZoopClick}
                >
                    Send Zoop
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default SendZoopDialog;