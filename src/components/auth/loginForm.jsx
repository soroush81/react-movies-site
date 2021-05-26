import React from 'react'
import { Paper, Grid, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser'
import UseCustomForm from './../common/useCustomForm';

const LoginForm = () => {

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    const { handleSubmit, validate, renderInput } = UseCustomForm({ username: '', password: '' }, schema);
    const methods = useForm();

    return (
        <>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "450px" }} onSubmit={handleSubmit} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item style={{ marginTop: 16 }}>
                            </Grid>
                            {renderInput('username', 'UserName', 'text', true)}
                            {renderInput('password', 'Password', 'password')}
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={!!validate()}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default LoginForm
