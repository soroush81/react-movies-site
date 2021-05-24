import React from 'react'
import { AppBar, Badge, Toolbar, IconButton, Typography, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
const NavBar = (props) => {
    return (
        <>
            <AppBar position="static" color="default"> <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    Movies
                </Typography>
                <Badge color="secondary" badgeContent={props.totalCounters} style={{ marginLeft: 20 }} />
            </Toolbar></AppBar>
            <Box m={2} />
        </>
    )
}

export default NavBar
