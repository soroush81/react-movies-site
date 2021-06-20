import React, { useState, useEffect } from 'react'
import { Box, Typography, Hidden, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Pagination, MovieTable, SearchBox } from '../../components'
import { getGenres, getMovies, deleteMovie } from '../../services'
import { paginate } from '../../utils/paginate'
import GenreList from './genreList'

const Movie = ({ user }) => {
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
    if (movies.length === 0) return <Typography variant="body2">There is no movie in the list</Typography>


    const movieTable = (<>
        <MovieTable
            movies={pagedMovies}
            onDelete={handleDelete}
            onLike={handleLike}
            onSort={handleSort}
            sortColumn={sortColumn} />
        <Pagination itemsCount={totalCount} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
    </>)
    return (
        <>
            <Box display="flex" p={1}>
                <GenreList data={genres} selectedGenre={selectedGenre} onGenreSelect={handleGenreSelect} />
                <Box p={1} xs={10} style={{ margin: "0 auto" }}>
                    <Box m={1} style={{ display: "flex", justifyContent: 'space-between' }}>
                        <SearchBox value={search} onChange={handleSearch} />
                        {user && <IconButton component={Link} to="/movies/new" variant="contained" ><AddIcon /></IconButton>}
                    </Box>
                    {movieTable}
                </Box>
                <Hidden smDown>
                    <Box p={1} xs={2} style={{ width: '15%' }}>
                    </Box>
                </Hidden>
            </Box>

        </>
    )
}

export default Movie


