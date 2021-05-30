import React, { useEffect } from 'react'
import UseCustomForm from '../../common/useCustomForm';
import { Paper, Grid, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser';
import { getGenres, getMovie } from './fakeMovieService'


const MovieForm = ({ match, history }) => {

    const schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Username'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).required().label('NumberInStock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate')
    }
    const genres = getGenres();
    const modelKeys = Object.keys(getMovie(1));

    const { handleSubmit, renderInput, renderButton, renderSelect, mapToViewModel } = UseCustomForm({ _id: '', title: '', genreId: 1, numberInStock: 0, dailyRentalRate: 1 }, schema);
    useEffect(() => {
        const movieId = match.params.id;
        console.log(match.params.id)
        if (movieId === "new") return;

        const movie = getMovie(movieId);
        console.log(movieId)
        console.log(movie)
        if (!movie) return history.replace("/not-found")
        mapToViewModel(movie, modelKeys);

    }, []);
    const methods = useForm();
    return (
        <>
            <h1>Movie Form</h1>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "40%" }} onSubmit={handleSubmit} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            {renderInput('title', 'Title', 'text', true)}
                            {renderSelect(genres, 'genreId', 'genreSelectLabel', 'Genre', 'genreId')}
                            {renderInput('numberInStock', 'Number In Stock')}
                            {renderInput('dailyRentalRate', 'Rate')}
                            <Grid item style={{ marginTop: 16 }}>
                                {renderButton('Save')}
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
            {/* <Button color="secondary" variant="contained" onClick={() => history.push('/movies')} >Save</Button> */}
        </>
    )
}

export default MovieForm
