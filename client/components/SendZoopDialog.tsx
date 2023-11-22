import SendIcon from "@mui/icons-material/Send"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar'
import TextField from "@mui/material/TextField";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";

import { 
    useGetAllUsersQuery, 
    useSendZoopMutation 
} from "../features/api";
import ZoopSentDialog from "./ZoopSentDialog";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

export interface SendZoopDialogProps {
    open: boolean
    onClose: () => void
}

const SendZoopDialog = ({open, onClose}: SendZoopDialogProps) => {
    const [selectedUser, setSelectedUser] = useState<{label: string, id: number} | null>(null);
    const [content, setContent] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();

    const currentUser = useSelector((state: RootState) => state.auth.user)
    
    const [sendZoop, { isLoading: isSendZoopLoading, isError, data: zoopData, error: zoopError }] = useSendZoopMutation();
    const {data: usersData, isLoading: isGetAllUsersLoading, error: userError } = useGetAllUsersQuery(); 

    const userOptions = useMemo(() => {
        return usersData ? 
          usersData.users.map(userObject => ({label: userObject.user.username, id: userObject.user.id})) : 
          [];
    }, [usersData])

    if (!currentUser) {
        console.error("User not logged in should not have access to send zoop dialog");
        navigate('/login');
        return null;
    }

    const handleSendZoopClick = () => {
        if (!isGetAllUsersLoading && !usersData) {
            console.error('No users to send Zoop to');
        } else if (!isGetAllUsersLoading && usersData) {
            if (!selectedUser) {
                setAlertOpen(true);
            } else {
                sendZoop({
                    content: content,
                    authorId: currentUser.id,
                    receiverId: selectedUser.id
                })
            }  
        }  
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertOpen(false);
      };

    if (zoopData) {
        return (
            <ZoopSentDialog
                sentZoop={zoopData.zoop}
                onClose={onClose}
            />
        )
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>Send Zoop</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        options={userOptions}
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
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000} 
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                >
                    <AlertTitle>Error</AlertTitle>
                    Please select user
                </Alert>
            </Snackbar>
            
        </>
        
    )

}

export default SendZoopDialog;