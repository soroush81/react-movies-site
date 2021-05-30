import React from 'react'
import { Paper, Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser'
import UseCustomForm from './../common/useCustomForm';

const RegisterForm = () => {
    const schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name')
    }

    const { handleSubmit, renderInput, renderButton } = UseCustomForm({ username: '', password: '', name: '' }, schema);
    const methods = useForm();

    return (
        <>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "450px" }} onSubmit={handleSubmit} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item style={{ marginTop: 16 }} xs={12}>
                                {renderInput('username', 'UserName', 'email', true)}
                            </Grid>
                            <Grid item style={{ marginTop: 16 }} xs={12}>
                                {renderInput('password', 'Password', 'password')}
                            </Grid>
                            <Grid item style={{ marginTop: 16 }} xs={12}>
                                {renderInput('name', 'Name')}
                            </Grid>
                            <Grid item style={{ marginTop: 16 }} xs={12}>
                                {renderButton('Register')}
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default RegisterForm;
