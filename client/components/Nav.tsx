import React, {useState} from "react";
import { NavLink, useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { selectCurrentUser } from "../features/authSlice";

type NavProps = {}

const Nav = (props: NavProps) =>  {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const isLoggedIn = !!selectCurrentUser;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />                
                </IconButton>
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
                            onClick={e => setAnchorEl(e.currentTarget)}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={e => setAnchorEl(null)}
                        >
                            <MenuItem 
                                onClick={e => {
                                    setAnchorEl(null);
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
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/me">Me</NavLink>
        </AppBar>
    );
}

export default Nav;