import React from 'react'
import { Button } from '@material-ui/core';
import Like from '../../common/like'
import CustomTable from '../../common/table'
import { Link } from 'react-router-dom';

const MoviesTable = ({ movies, onDelete, onLike, onSort, sortColumn }) => {
    const columns = [
        { path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>{movie.title}</Link> },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        { path: "publishDate", label: "PublishDate" },
        { key: "like", content: movie => <Like like={movie.like} onLikeToggle={() => onLike(movie)} /> },
        { key: "delete", content: movie => <Button variant="contained" color="secondary" onClick={() => onDelete(movie._id)}>Delete</Button> }];

    return (
        <>
            <CustomTable onSort={onSort} sortColumn={sortColumn} data={movies} columns={columns} />
        </>
    )
}

export default MoviesTable
