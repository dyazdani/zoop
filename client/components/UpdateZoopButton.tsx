import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import UpdateZoopDialog from './UpdateZoopDialog';
import { ZoopWithDetails } from '../../src/types/custom';

export interface UpdateZoopButtonProps{
    zoop: ZoopWithDetails
}

const UpdateZoopButton = ({zoop}: UpdateZoopButtonProps) => {
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    return (
        <>
            <IconButton 
                aria-label='update'
                onClick={() => setIsUpdateDialogOpen(true)}
            >
                <EditIcon />
            </IconButton>
        
            <UpdateZoopDialog
                zoop={zoop}
                open={isUpdateDialogOpen}
                onClose={() => setIsUpdateDialogOpen(false)}
            />  
        </>

    )
}

export default UpdateZoopButton;