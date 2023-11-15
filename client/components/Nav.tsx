import React, {useState} from "react";
import { NavLink, useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { selectCurrentUser } from "../features/authSlice";


const Nav = () =>  {
    const [menuIconAnchorEl, setMenuIconAnchorEl] = useState<null | HTMLElement>(null);
    const [accountCircleAnchorEl, setAccountCircleAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const isLoggedIn = !!selectCurrentUser;

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={e => setMenuIconAnchorEl(e.currentTarget)}
                    >
                        <MenuIcon />                
                    </IconButton>
                    <Menu
                        anchorEl={menuIconAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(menuIconAnchorEl)}
                        onClose={e => setMenuIconAnchorEl(null)}
                    >
                        <MenuItem 
                            onClick={e => {
                                setMenuIconAnchorEl(null);
                                navigate("/");
                            }}
                        > 
                            Home
                        </MenuItem>
                        {!isLoggedIn && (
                            <>
                                <MenuItem 
                                    onClick={e => {
                                        setMenuIconAnchorEl(null);
                                        navigate("/login");
                                    }}
                                > 
                                    Login
                                </MenuItem>
                                <MenuItem 
                                    onClick={e => {
                                        setMenuIconAnchorEl(null);
                                        navigate("/register");
                                    }}
                                > 
                                    Register
                                </MenuItem>
                            </> 
                        )}
                    </Menu>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ flexGrow: 1 }}
                    >
                        ZOOP - - - - - - - <SendIcon/>
                    </Typography>

                    {isLoggedIn && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={e => setAccountCircleAnchorEl(e.currentTarget)}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
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
                                {/* TODO: Create a logout action that happens for the onClick for the Logout MenuItem */}
                                <MenuItem>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/me">Me</NavLink>
        </>
        
    );
}

export default Nav;