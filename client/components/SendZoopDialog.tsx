import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import React, {
    useState,
} from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

import { RootState} from "../app/store";
import { 
    usePostZoopMutation, 
    useGetAllUsersQuery,
    useGetMeQuery
}  from "../features/api";

const SendZoopDialog = () => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [zoopSent, setZoopSent] = useState(false);
    const [lastZoopSentId, setLastZoopSentId] = useState<number | null>(null);

    // Variable used for authorization
    const token = useSelector((state: RootState) => state.auth.token);

    const currentUser = useGetMeQuery().data;

    const [postZoop, { isLoading: isPostZoopLoading, isError, data: zoopData }] = usePostZoopMutation();
    const {data: usersData, isLoading: isGetAllUsersLoading, error } = useGetAllUsersQuery(); 

    const navigate = useNavigate();

    const handleSendZoopClick = () => {
        if (!isGetAllUsersLoading && !usersData) {
            throw new Error('No users to send Zoop to');
            // TODO: How best to render a message about this error in UI?
        } else if (!isGetAllUsersLoading && usersData) {
            const [recipient] = usersData.users.filter(user => user.username === username);
            if (recipient && currentUser) {
                postZoop({
                    content: content,
                    authorId: currentUser.user.id,
                    receiverId: recipient.id
                })
                setZoopSent(true)
            } else {
                throw new Error('No such user exists. Please select a different username');
                // TODO: How best to render this error in UI?
            }
            
        }
        
    }

    return (
        <>
            {token && (
                <Fab
                    disabled={!token}
                    sx={{
                        position: "absolute",
                        bottom: 25,
                        right: 25
                    }}
                    onClick={() => setOpen(true)}
                > <SendIcon />
                </Fab>
            )}


            {/* Render a success dialog if Zoop was sent and successfully integrated into DB,
                or an input dialog if Zoop has not yet been sent */}
            {zoopData?.zoop ? (
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Zoop Sent!</DialogTitle>
                    <DialogContent>
                        <DialogContentText> 
                            <Link
                                component="button"
                                onClick={() => navigate(`/zoops/${zoopData.zoop.id}`)}
                            > 
                                Go to this page to view your Zoop.
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
                            placeholder="e.g., Zoop is the new hotness."  
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
            )}
            
        </>
    )
};

export default SendZoopDialog;