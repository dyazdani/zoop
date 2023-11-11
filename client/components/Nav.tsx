import React from "react";
import { NavLink } from "react-router-dom";

type NavProps = {}

const Nav = (props: NavProps) =>  {
    return(
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/me">Me</NavLink>
        </>
    );
}

export default Nav;