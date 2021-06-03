import React from 'react'
import { AppBar, Badge, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { Link, NavLink } from 'react-router-dom';
const NavBar = ({ user }) => {
    const navLinkStyle =
    {
        textDecoration: "none",
        padding: 20
    }

    const activeNavLinkStyle = {
        background: '#f50056',
        color: 'white'
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Hidden smUp>
                        <IconButton onClick={handleClick} edge="start" color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true">
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/movies">Movies</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/customers">Customers</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/rental">Rental</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/admin">Dashboard</MenuItem>
                    </Menu>
                    <Typography variant="h6">
                        <Link to="/" style={navLinkStyle}>
                            Movies
                        </Link>
                    </Typography>
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
                </Toolbar>
            </AppBar>
            <Box m={2} />
        </>
    )
}

export default NavBar
