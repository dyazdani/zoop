import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Zoop } from "../../src/types/custom";


export interface ZoopSentDialogProps {
    isZoopSent: boolean
    sentZoop: Zoop | null
}

const ZoopSentDialog = ({isZoopSent, sentZoop}: ZoopSentDialogProps) => {
    const [open, setOpen] = useState(isZoopSent);
    
    const navigate = useNavigate()

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Zoop Sent!</DialogTitle>
            <DialogContent>
                <DialogContentText> 
                    <Link
                        component="button"
                        onClick={() => {
                            navigate(`/zoops/${sentZoop?.id}`)
                            setOpen(false);
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