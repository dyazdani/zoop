import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

import { 
    useGetAllUsersQuery, 
    useGetMeQuery, 
    useSendZoopMutation 
} from "../features/api";
import { Zoop } from "../../src/types/custom";

export interface SendZoopDialogProps {
    openDialog: boolean
    isZoopSent: () => void
    sentZoop: (zoop: Zoop) => void;
}

const SendZoopDialog = ({openDialog, isZoopSent, sentZoop}: SendZoopDialogProps) => {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(openDialog);

    const currentUser = useGetMeQuery().data;

    const [sendZoop, { isLoading: isSendZoopLoading, isError, data: zoopData }] = useSendZoopMutation();
    const {data: usersData, isLoading: isGetAllUsersLoading, error } = useGetAllUsersQuery(); 

    const handleSendZoopClick = () => {
        setOpen(false);
        if (!isGetAllUsersLoading && !usersData) {
            throw new Error('No users to send Zoop to');
        } else if (!isGetAllUsersLoading && usersData) {
            const [recipient] = usersData.users.filter(el => el.user.username === username);
            if (recipient && currentUser) {
                sendZoop({
                    content: content,
                    authorId: currentUser.user.id,
                    receiverId: recipient.user.id
                })
                isZoopSent();
                // TODO: figure out why zoopData is undefined.
                if (!isSendZoopLoading && zoopData) {
                    console.log("zoopData: ", zoopData);
                    sentZoop(zoopData.zoop);
                }
            } else {
                throw new Error('No such user exists. Please select a different username');
            }  
        }  
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
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