import SendIcon from "@mui/icons-material/Send"
import Autocomplete from "@mui/material/Autocomplete";
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
    useSendZoopMutation 
} from "../features/api";
import ZoopSentDialog from "./ZoopSentDialog";
import { RootState } from "../app/store";

export interface SendZoopDialogProps {
    open: boolean
    onClose: () => void
}

const SendZoopDialog = ({open, onClose}: SendZoopDialogProps) => {
    const [selectedUser, setSelectedUser] = useState<{label: string, id: number} | null>(null);
    const [content, setContent] = useState("");

    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [sendZoop, { isLoading: isSendZoopLoading, isError, data: zoopData, error: zoopError }] = useSendZoopMutation();
    const {data: usersData, isLoading: isGetAllUsersLoading, error: userError } = useGetAllUsersQuery(); 


    const handleSendZoopClick = () => {
        if (!isGetAllUsersLoading && !usersData) {
            console.error('No users to send Zoop to');
        } else if (!isGetAllUsersLoading && usersData) {
            const [recipient] = usersData.users.filter(el => el.user.username === selectedUser?.label);
            if (recipient && currentUser) {
                sendZoop({
                    content: content,
                    authorId: currentUser.id,
                    receiverId: recipient.user.id
                })
            } else {
                console.error('No such user exists. Please select a different username');
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
    
    const usernames = usersData ? 
        usersData.users.map(userObject => ({label: userObject.user.username, id: userObject.user.id})) : 
        [];

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Send Zoop</DialogTitle>
            <DialogContent>
                <Autocomplete
                    disablePortal
                    options={usernames}
                    renderInput={(params) => <TextField {...params} label="Username" />}
                    onChange={(e, value, reason) => setSelectedUser(value)}
                    value={selectedUser}
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