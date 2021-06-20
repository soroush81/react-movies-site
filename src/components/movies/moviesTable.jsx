import React from 'react'
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { Like, CustomTable } from '../../components'
import authService from '../../services/authService';

const MoviesTable = ({ movies, onDelete, onLike, onSort, sortColumn }) => {
    const user = authService.getCurrentUser();
    const adminVisible = (user && user.isAdmin) ? true : false;
    const userVisible = user ? true : false;
    const columns = [
        { path: "title", label: "Title", adminVisible, content: movie => <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none", color: "orange" }}>{movie.title}</Link> },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        { key: "like", userVisible, content: movie => <Like like={movie.like} onLikeToggle={() => onLike(movie)} /> },
        { key: "delete", adminVisible, content: movie => <IconButton variant="contained" color="secondary" onClick={() => onDelete(movie._id)}><DeleteIcon /></IconButton> }];

    return (
        <>
            <CustomTable onSort={onSort} sortColumn={sortColumn} data={movies} columns={columns} />
        </>
    )
}

export default MoviesTable
