import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';
import { navLinkStyle } from './styles'
import NavMenu from './navMenu'
import HamMenu from './hamMenu'
const NavBar = ({ user, toggleTheme, themeIcon }) => {
    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: grey[800] }}>
                    <HamMenu />
                    <Typography variant="h6">
                        <Link to="/" style={{ ...navLinkStyle, color: "orange" }}>
                            Movies
                        </Link>
                    </Typography>
                    <NavMenu user={user} />
                    <IconButton onClick={toggleTheme}>{themeIcon}</IconButton>
                </Toolbar>
            </AppBar>
            <Box m={2} />
        </>
    )
}

export default NavBar
