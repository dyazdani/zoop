import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {useState} from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../features/authSlice';
import {RootState} from '../app/store'

const AppHeader = () =>  {
    const [accountCircleAnchorEl, setAccountCircleAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const currentUser = useSelector((state: RootState) => state.auth.user)


    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    component="div"
                >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-account"
                        aria-haspopup="true"
                        onClick={e => setAccountCircleAnchorEl(e.currentTarget)}
                        color="inherit"
                        disabled={!currentUser}
                    >
                        <AccountCircle 
                            fontSize='large'
                        /> 
                        {!currentUser && (
                            <Typography
                                variant='h6'
                            >
                                Please Log In
                            </Typography>
                        )}
                    </IconButton>
                    <Menu
                        id="menu-account"
                        anchorEl={accountCircleAnchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(accountCircleAnchorEl)}
                        onClose={e => setAccountCircleAnchorEl(null)}
                    >
                        <MenuItem 
                            onClick={e => {
                                setAccountCircleAnchorEl(null);
                                navigate("/me");
                            }}
                        > 
                            Profile
                        </MenuItem>
                        <MenuItem
                            onClick={e => {
                                setAccountCircleAnchorEl(null);
                                dispatch(logout());
                                navigate("/");
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>

                <NavLink to="/" >
                    <img src="/images/Zoop_logo_withtext.svg"/>
                </NavLink>

                
                <Box component='div'>
                    {!currentUser && (
                        <ButtonGroup
                            variant='contained'
                            aria-label='contained button group'
                        >
                            <Button 
                                color='primary'
                                onClick={() => {navigate('/login')}}
                            >
                                Login
                            </Button>
                            <Button 
                                color='secondary'
                                onClick={() => {navigate('/register')}}
                            >
                                Sign Up
                            </Button>
                        </ButtonGroup>
                    )}
                </Box>
            </Stack>
        </>
        
    );
}

export default AppHeader;