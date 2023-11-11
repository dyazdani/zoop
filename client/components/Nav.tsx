import React from "react";
import { NavLink } from "react-router-dom";

type NavProps = {}

const Nav = (props: NavProps) =>  {
    return(
        <>
            <NavLink style={{marginRight: 10}} to="/">Home</NavLink>
            <NavLink style={{marginRight: 10}} to="/login">Login</NavLink>
            <NavLink style={{marginRight: 10}}  to="/register">Register</NavLink>
            <NavLink to="/me">Me</NavLink>
        </>
    );
}

export default Nav;