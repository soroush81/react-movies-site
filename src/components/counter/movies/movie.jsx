import React, { useState, useEffect } from 'react'
import { getMovies } from './fakeMovieService'
import { Box, Typography, Hidden } from '@material-ui/core';
import Pagination from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import ListGroup from '../../common/listGroup'
import { getGenres } from '../movies/fakeMovieService'
import MovieTable from './moviesTable'
import _ from 'lodash'

const Movie = () => {
    const [movies, setMovies] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })

    const pageSize = 3;


    useEffect(() => {
        const allGenres = [{ _id: "", value: 'All Genres' }, ...getGenres()]
        setGenres(allGenres)
        setMovies(getMovies());
    }, []);

    const handleDelete = (id) => {
        const filtered = movies.filter(m => m._id !== id)
        setMovies(filtered)
    }

    const handleLike = (movie) => {
        const newMovies = [...movies]
        const index = movies.indexOf(movie)
        newMovies[index] = { ...newMovies[index] }
        newMovies[index].like = !newMovies[index].like;
        setMovies(newMovies);
    }

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn)
    }

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.innerText))
    }
    const handleGenreSelect = (genre) => {
        setCurrentPage(1);
        setSelectedGenre(genre)
    }

    const getPagedData = () => {
        const filtered = (selectedGenre && selectedGenre._id) ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        let pagedMovies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, pagedMovies: pagedMovies }
    }

    const { totalCount, pagedMovies } = getPagedData()
    if (movies.length === 0) return <p>There is no movie in the list</p>

    return (
        <>
            <Box display="flex" p={1}>
                <Hidden smDown>
                    <Box p={1} xs={2} style={{ width: '20%' }}>
                        <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={handleGenreSelect} />
                    </Box>
                </Hidden>
                <Box p={1} xs={10} style={{ width: '80%' }}>
                    <Box m={2} />
                    <Typography color="default" variant="h5" component="h2" >Show {totalCount} movies in database</Typography>
                    <Box m={2} />
                    <MovieTable movies={pagedMovies} onDelete={handleDelete} onLike={handleLike} onSort={handleSort} sortColumn={sortColumn} />
                    <Pagination itemsCount={totalCount} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
                </Box>
            </Box>

        </>
    )
}

export default Movie


