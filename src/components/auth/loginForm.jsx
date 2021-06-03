import React, { useState } from 'react'
import { Paper, Grid, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Redirect } from 'react-router-dom'
import Joi from 'joi-browser'
import authService from '../../services/authService'
import FormInput from '../common/formInput'
import { validate, validateField } from '../../hooks/useValidate'

const LoginForm = ({ history, location }) => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState([]);
    const methods = useForm();

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(user, schema));
        if (errors) {
            return;
        }
        doSubmit();
    };

    const doSubmit = async () => {
        try {
            await authService.login(user.username, user.password)
            window.location = (location.state) ? location.state.from.pathname : '/';
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errs = { ...errors }
                errs.username = ex.response.data;
                setErrors(errs)
            }
        }
    }

    const changeHandler = ({ target: input }) => {
        const newErrorObj = validateField(input, schema, errors);
        setErrors(newErrorObj);
        const newValueObj = { ...user };
        newValueObj[input.name] = input.value;
        setUser(newValueObj);
    }

    if (authService.getCurrentUser()) return <Redirect to="/" />

    return (
        <>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "450px" }} onSubmit={(e) => handleSubmit(e)} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <FormInput
                                name='username'
                                label='UserName'
                                value={user.username}
                                onChange={changeHandler}
                                required
                                size={12}
                                autoFocus={true}
                                error={errors && errors['username']} />
                            <FormInput
                                name='password'
                                label='Password'
                                value={user.password}
                                onChange={changeHandler}
                                required
                                size={12}
                                type='password'
                                error={errors && errors['username']} />
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={!!validate(user, schema)}>Login</Button>
                            </Grid>

                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default LoginForm
