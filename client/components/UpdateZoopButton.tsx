import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import UpdateZoopDialog from './UpdateZoopDialog';
import { ZoopWithDetails } from '../../src/types/custom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export interface UpdateZoopButtonProps{
    zoop: ZoopWithDetails
}

const UpdateZoopButton = ({zoop}: UpdateZoopButtonProps) => {
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const currentUser = useSelector((state: RootState) => state.auth.user)

    if (!currentUser || currentUser.id !== zoop.authorId) {
        return null;
    }

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