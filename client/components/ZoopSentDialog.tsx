import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Link} from "react-router-dom";
import React from "react";
import { Zoop } from "../../src/types/custom";
import { Typography } from '@mui/material';


export interface ZoopSentDialogProps {
    sentZoop: Zoop
    onClose: () => void
}

const ZoopSentDialog = ({sentZoop, onClose}: ZoopSentDialogProps) => {
    

    return (
        <Dialog
            open={true}
            onClose={onClose}
        >
            <DialogTitle>Zoop Sent!</DialogTitle>
            <DialogContent>
                <DialogContentText> 
                    <Link
                        to={`/zoops/${sentZoop.id}`}    
                    >
                        <Button
                            type="button"
                            variant='contained'
                            onClick={() => {
                                onClose();
                            }}
                        > 
                            <Typography>Go to Zoop</Typography>
                        </Button>
                    </Link>
                    
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )

}

export default ZoopSentDialog;