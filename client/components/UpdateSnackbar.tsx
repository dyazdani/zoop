import React, {useState} from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box } from "@mui/material";


export interface UpdateSnackbarProps {
    open: boolean
    onClose: () => void
}

const UpdateSnackbar = ({open, onClose}: UpdateSnackbarProps) => {

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        event.preventDefault();
        if (reason === 'clickaway') {
            return;
        }
        onClose();

    }
    return (
        // <Box 
        //     component="div"
        //     onClick={(e) => {
        //         e.stopPropagation()
        //     }}
        // >
            <Snackbar 
                open={open} 
                autoHideDuration={6000} 
                onClose={handleClose}
                onClick={(e) => {
                    e.preventDefault()
                }}
            >
                <MuiAlert 
                    onClose={handleClose} 
                    severity="success" 
                    sx={{ width: '100%' }}
                >
                    Zoop updated!
                </MuiAlert>
            </Snackbar>
        // </Box>
        
    )
}

export default UpdateSnackbar;