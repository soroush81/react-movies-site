import React from 'react'
import { IconButton, Menu, MenuItem, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu'
const HamMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Hidden smUp>
                <IconButton onClick={handleClick} edge="start" color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true">
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose} component={Link} to="/movies">Movies</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/customers">Customers</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/rental">Rental</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/admin">Dashboard</MenuItem>
            </Menu>
        </>
    )
}

export default HamMenu
