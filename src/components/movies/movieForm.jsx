import React, { useState, useEffect } from 'react'
import { Paper, Grid, IconButton, Button, Box } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { validate, validateField } from '../../hooks/useValidate'
import { FormInput, FormSelect } from '../../components'
import { getGenres, getMovie, saveMovie } from '../../services'
import { useStyles } from './styles'

const MovieForm = ({ match, history }) => {
    const classes = useStyles();
    const [genres, setGenres] = useState([])
    const [movie, setMovie] = useState({ _id: '', title: '', genreId: '', numberInStock: 0, dailyRentalRate: 0 });
    const [errors, setErrors] = useState([]);
    const methods = useForm();

    const schema = {
        _id: Joi.string().allow(''),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).required().label('NumberInStock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate')
    }
    const mapToViewModel = (m) => {
        setMovie({
            _id: m._id,
            title: m.title,
            genreId: m.genre._id,
            numberInStock: m.numberInStock,
            dailyRentalRate: m.dailyRentalRate
        })
    }

    useEffect(async () => {
        await populateGenres();
        await populateMovie();
    }, []);

    const populateGenres = async () => {
        setGenres(await getGenres());
    }

    const populateMovie = async () => {
        try {
            const movieId = match.params.id;
            if (movieId === "new") return;

            const _movie = await getMovie(movieId);
            mapToViewModel(_movie);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                history.replace("/not-found")
        }
    }

    const checkValidation = () => {
        setErrors(validate(movie, schema));
        if (errors && Object.keys(errors).length !== 0) {
            return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        checkValidation();
        doSubmit();
    };

    const doSubmit = async () => {
        await saveMovie(movie);
        history.push("/movies")
    }

    const changeHandler = ({ target: input }) => {
        setErrors(validateField(input, schema, errors));
        updateMovieState(input.name, input.value)
    }

    const updateMovieState = (path, value) => {
        const newValueObj = { ...movie };
        newValueObj[path] = value;
        setMovie(newValueObj);
    }

    const onBackButtonClick = () => {
        history.push("/movies")
    }


    return (
        <>
            <FormProvider {...methods}>
                <form className={classes.form} onSubmit={(e) => handleSubmit(e, doSubmit)} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <FormInput
                                name='title'
                                label='Title'
                                value={movie.title}
                                onChange={changeHandler}
                                required
                                size={12}
                                autoFocus={true}
                                error={errors && errors['title']} />
                            <FormSelect
                                id='genreId'
                                name='genreId'
                                label='Genre'
                                items={genres}
                                labelId='genreSelectLabel'
                                selectedId={movie.genreId}
                                onChange={changeHandler}
                                required
                                size={12} />
                            <FormInput
                                name='numberInStock'
                                label='Number In Stock'
                                value={movie.numberInStock}
                                onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors['numberInStock']} />
                            <FormInput
                                name='dailyRentalRate'
                                label='Rate'
                                value={movie.dailyRentalRate}
                                onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors['dailyRentalRate']} />
                            <Grid item className={classes.buttonPanel}>
                                <Button variant="contained" color="secondary" type="submit" disabled={validate(movie, schema)}>Save</Button>
                                <IconButton onClick={() => onBackButtonClick("/movies")}><ArrowBackIcon /></IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default MovieForm
