import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState }from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';
import UpdateZoopDialog from '../components/UpdateZoopDialog';

export interface MoreButtonProps {
    zoopId: number
    authorId: number
    receiverId: number
    content: string
}

const MoreButton = ({zoopId, authorId, receiverId, content}: MoreButtonProps) => {
    const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const currentUser = useSelector((state: RootState) => state.auth.user);

    return (
        <>
            <IconButton
                size="large"
                aria-label="more zoop options"
                aria-controls="menu-zoop"
                aria-haspopup="true"
                onClick={e => setMoreMenuAnchorEl(e.currentTarget)}
                color="inherit"
            >
                <MoreHorizIcon 
                    fontSize='large'
                /> 
            </IconButton>
            <Menu
                id="menu-zoop"
                anchorEl={moreMenuAnchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(moreMenuAnchorEl)}
                onClose={e => setMoreMenuAnchorEl(null)}
            >
                
                <MenuItem 
                    onClick={e => {
                        setMoreMenuAnchorEl(null);
                        setIsUpdateDialogOpen(true);
                    }}
                > 
                    Update
                </MenuItem>
                <MenuItem 
                    onClick={e => {
                        setMoreMenuAnchorEl(null);
                    }}
                > 
                    Delete
                </MenuItem>
            </Menu>

                <UpdateZoopDialog
                    zoopId={zoopId}
                    content={content}
                    open={isUpdateDialogOpen}
                    onClose={() => {setIsUpdateDialogOpen(false)}}
                />            
        </>
        
    )

}

export default MoreButton;