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
    const [currentUser, setCurrentUser] = useState(useGetMeQuery().data);


    const [postZoop, { isLoading: isPostZoopLoading, isError, data: zoopData }] = usePostZoopMutation();
    const {data: usersData, isLoading: isGetAllUsersLoading, error } = useGetAllUsersQuery() 

    const navigate = useNavigate();

    const handleSendZoopClick = () => {
        if (!usersData) {
            throw new Error('No users to send Zoop to');
            // TODO: How best to render a message about this error in UI?
        } else {
            const [recipient] = usersData.users.filter(user => user.username === username);
            if (recipient) {
                postZoop({
                    content: content,
                    authorId: currentUser?.user.id,
                    receiverId: recipient.id
                })
                .unwrap()
                .then((payload) => {
                    console.log('fulfilled', payload);
                    setLastZoopSentId(payload.zoop.id)
                })
                .catch((error) => console.error('rejected', error));
              
                setZoopSent(true)
            } else {
                throw new Error('No such user exists. Please select a different username');
                // TODO: How best to render this error in UI?
            }
            
        }
        
    }

    return (
        <>
            {/*TODO: Disable this button if user is not logged in */}
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
                                onClick={() => navigate(`/zoops/${lastZoopSentId}`)}
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