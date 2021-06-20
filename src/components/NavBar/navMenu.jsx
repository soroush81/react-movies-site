import React from 'react'
import { Hidden } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { navLinkStyle, activeNavLinkStyle } from './styles'

const NavMenu = ({ user }) => {
    return (
        <>
            <Hidden xsDown >
                <NavLink to="/movies" style={navLinkStyle} activeStyle={activeNavLinkStyle}>Movies</NavLink>
                <NavLink to="/customers" style={navLinkStyle} activeStyle={activeNavLinkStyle}>Customers</NavLink>
                <NavLink to="/rental" style={navLinkStyle} activeStyle={activeNavLinkStyle} >Rental</NavLink>
                <NavLink to="/posts" style={navLinkStyle} activeStyle={activeNavLinkStyle} >Posts</NavLink>
                {!user &&
                    <>
                        <NavLink to="/login" style={navLinkStyle} activeStyle={activeNavLinkStyle} >Login</NavLink>
                        <NavLink to="/register" style={navLinkStyle} activeStyle={activeNavLinkStyle} >Register</NavLink>
                    </>
                }
                {user &&
                    <>
                        <NavLink to="/profile" style={navLinkStyle} activeStyle={activeNavLinkStyle} >{user.name}</NavLink>
                        <NavLink to="/logout" style={navLinkStyle} activeStyle={activeNavLinkStyle} >Logout</NavLink>
                    </>}
            </Hidden>
        </>
    )
}

export default NavMenu
