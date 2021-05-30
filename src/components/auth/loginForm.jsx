import React from 'react'
import { Paper, Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser'
import UseCustomForm from './../common/useCustomForm';

const LoginForm = () => {

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    const { handleSubmit, renderInput, renderButton } = UseCustomForm({ username: '', password: '' }, schema);
    const methods = useForm();

    return (
        <>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "450px" }} onSubmit={handleSubmit} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item style={{ marginTop: 16 }} xs={12}>
                                {renderInput('username', 'UserName', 'text', true)}
                            </Grid>
                            <Grid item style={{ marginTop: 16 }} xs={12}>
                                {renderInput('password', 'Password', 'password')}
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                {renderButton('Login')}
                            </Grid>

                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default LoginForm
