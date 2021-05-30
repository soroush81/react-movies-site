import React, { useEffect } from 'react'
import UseCustomForm from '../../common/useCustomForm';
import { Paper, Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser';
import { getGenres, getMovie, saveMovie } from './fakeMovieService'


const MovieForm = ({ match, history }) => {
    const genres = getGenres();

    const schema = {
        _id: Joi.number(),
        title: Joi.string().required().label('Username'),
        genreId: Joi.number().required().label('Genre'),
        numberInStock: Joi.number().min(0).required().label('NumberInStock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate')
    }
    const mapToViewModel = (m) => {
        return {
            _id: m._id,
            title: m.title,
            genreId: m.genre._id,
            numberInStock: m.numberInStock,
            dailyRentalRate: m.dailyRentalRate
        }
    }
    const methods = useForm();
    const { handleSubmit, renderInput, renderButton, renderSelect, customMapToViewModel } = UseCustomForm({
        _id: 0, title: '', genreId: 1, numberInStock: 0, dailyRentalRate: 0
    }, schema, mapToViewModel);

    useEffect(() => {
        const movieId = match.params.id;
        if (movieId === "new") return;

        const _movie = getMovie(movieId);
        if (!_movie) return history.replace("/not-found")
        customMapToViewModel(_movie);
    }, []);


    const doSubmit = (item) => {
        saveMovie(item);
        history.push("/movies")
    }

    return (
        <>
            <h1>Movie Form</h1>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "40%" }} onSubmit={(e) => handleSubmit(e, doSubmit)} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            {renderInput('title', 'Title', 'text', true)}
                            {renderSelect(genres, 'genreId', 'genreSelectLabel', 'Genre', 'genreId')}
                            {renderInput('numberInStock', 'Number In Stock')}
                            {renderInput('dailyRentalRate', 'Rate')}
                            <Grid item style={{ marginTop: 16 }}>
                                {renderButton('Save', doSubmit)}
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default MovieForm
