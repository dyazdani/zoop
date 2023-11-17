import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Zoop } from "../../src/types/custom";


export interface ZoopSentDialogProps {
    sentZoop: Zoop
    onClose: () => void
}

const ZoopSentDialog = ({sentZoop, onClose}: ZoopSentDialogProps) => {
    
    const navigate = useNavigate()

    return (
        <Dialog
            open={true}
            onClose={onClose}
        >
            <DialogTitle>Zoop Sent!</DialogTitle>
            <DialogContent>
                <DialogContentText> 
                    <Link
                        component="button"
                        onClick={() => {
                            navigate(`/zoops/${sentZoop.id}`)
                            onClose();
                        }}
                    > 
                        Go to Zoop.
                    </Link>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )

}

export default ZoopSentDialog;