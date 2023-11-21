import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState }from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';

const MoreButton = () => {
    const [moreIconAnchorEl, setMoreIconAnchorEl] = useState<null | HTMLElement>(null);

    const currentUser = useSelector((state: RootState) => state.auth.user);

    if (!currentUser) {
        console.log('currentUser value is falsy: ', currentUser)
    }

    return (
        <Box
            component="div"
        >
            <IconButton
                size="large"
                aria-label="more zoop options"
                aria-controls="menu-zoop"
                aria-haspopup="true"
                onClick={e => setMoreIconAnchorEl(e.currentTarget)}
                color="inherit"
                disabled={!currentUser}
            >
                <MoreHorizIcon 
                    fontSize='large'
                /> 
            </IconButton>
            <Menu
                id="menu-zoop"
                anchorEl={moreIconAnchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(moreIconAnchorEl)}
                onClose={e => setMoreIconAnchorEl(null)}
            >
                <MenuItem 
                    onClick={e => {
                        setMoreIconAnchorEl(null);
                    }}
                > 
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={e => {
                        setMoreIconAnchorEl(null);
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
            </Box>
    )

}

export default MoreButton;