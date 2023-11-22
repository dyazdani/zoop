import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useUpdateZoopMutation } from "../features/api";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

export interface UpdateZoopDialogProps {
    open: boolean
    onClose: () => void
    zoopId: number
    content: string
}

const UpdateZoopDialog = ({open, onClose, zoopId, content}: UpdateZoopDialogProps) => {
    const [contentForUpdate, setContentForUpdate] = useState(content);

    const navigate = useNavigate();

    const currentUser = useSelector((state: RootState) => state.auth.user)
    
    if (!currentUser) {
        console.error("User not logged in does not have access to update zoop dialog");
        navigate('/login');
        return null;
    }

    const [updateZoop, { isLoading, isError, data, error }] = useUpdateZoopMutation();

    //TODO: No way to test updating zoop because can't log in as db seen users and can't make zoop in this branch
    const handleUpdateZoopClick = async () => {
        const zoop = await updateZoop({
            id: zoopId,
            content: contentForUpdate
        }) 

        if (error) {
            console.error(error)
        } else {
            console.log('updated Zoop: ', zoop)
        }

    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Update Zoop</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    fullWidth
                    multiline
                    margin="dense"
                    label="Content"
                    type="text"
                    onChange={(e) => setContentForUpdate(e.target.value)}
                    value={contentForUpdate}    
                />    
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleUpdateZoopClick}
                >
                    Update Zoop
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default UpdateZoopDialog;