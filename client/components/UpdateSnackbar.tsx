import React, {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export interface UpdateSnackbarProps {
    open: boolean
    onClose: () => void
}

const UpdateSnackbar = ({open, onClose}: UpdateSnackbarProps) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();

    }
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
        >
            <MuiAlert 
                onClose={handleClose} 
                severity="success" 
                sx={{ width: '100%' }}
            >
                Zoop updated!
            </MuiAlert>
        </Snackbar>
    )
}

export default UpdateSnackbar;