import React, { useState, useEffect } from 'react'
import { getMovies, deleteMovie } from '../../services/movieService'
import { Box, Typography, Hidden, Button } from '@material-ui/core';
import Pagination from '../common/pagination'
import { paginate } from '../../utils/paginate'
import ListGroup from '../common/listGroup'
import { getGenres } from '../../services/genreService'
import MovieTable from './moviesTable'
import { Link } from 'react-router-dom'
import SearchBox from '../common/searchBox'
import _ from 'lodash'
import { toast } from 'react-toastify'
const Movie = ({ history, user }) => {
    const [movies, setMovies] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
    const [search, setSearch] = useState('')
    const pageSize = 3;


    useEffect(async () => {
        let allGenres = await getGenres();
        allGenres = [{ _id: "", name: 'All Genres' }, ...allGenres]
        setGenres(allGenres)
        setMovies(await getMovies());
    }, []);

    const handleDelete = async (id) => {
        const originalMovies = movies;

        try {
            const filtered = movies.filter(m => m._id !== id)
            setMovies(filtered)
            await deleteMovie(id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('the movie has already been deleted')
            setMovies(originalMovies)
        }

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
        setSearch("")
    }

    const handleSearch = (query) => {
        setSearch(query);
        setSelectedGenre(null)
        setCurrentPage(1)
    }


    const getPagedData = () => {
        let filtered = movies;
        if (search)
            filtered = movies.filter(m => m.title.toLowerCase().startsWith(search.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = movies.filter(m => m.genre._id === selectedGenre._id);

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
                    {user && <Button color="primary" component={Link} to="/movies/new" variant="contained" >New Movie</Button>}
                    <Box m={2} />
                    <Typography color="default" variant="h5" component="h2" >Show {totalCount} movies in database</Typography>
                    <Box m={2} />
                    <SearchBox value={search} onChange={handleSearch} />
                    <Box m={2} />
                    <MovieTable
                        movies={pagedMovies}
                        onDelete={handleDelete}
                        onLike={handleLike}
                        onSort={handleSort}
                        sortColumn={sortColumn} />
                    <Pagination itemsCount={totalCount} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
                </Box>
            </Box>

        </>
    )
}

export default Movie


