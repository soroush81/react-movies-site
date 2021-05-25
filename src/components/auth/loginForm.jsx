import React, { useState } from 'react'
import { Paper, Grid, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../common/formInput'
import Joi from 'joi-browser'

const LoginForm = () => {

    const [account, setAccount] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({})

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate());
        if (errors) return;
    }

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(account, schema, options)
        if (!error) return;
        const errs = {}
        for (let err of error.details) {
            errs[err.path[0]] = err.message;
        }
        // return (Object.keys(errs).length === 0) ? null : errs;
        return errs;
    }

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const newSchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, newSchema);
        if (!error)
            return null;
        return error.details[0].message;
    }


    const changeHandler = ({ target: input }) => {
        const errorMessage = validateProperty(input);
        const newErrorObj = { ...errors };
        if (errorMessage) newErrorObj[input.name] = errorMessage;
        else delete newErrorObj[input.name];

        setErrors(newErrorObj);
        const newAccountObj = { ...account };
        newAccountObj[input.name] = input.value;
        setAccount(newAccountObj);
    }
    const methods = useForm();
    return (
        <>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "450px" }} onSubmit={handleSubmit} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item style={{ marginTop: 16 }}>
                            </Grid>
                            <FormInput
                                name="username"
                                label="UserName"
                                value={account.username}
                                onChange={changeHandler}
                                required
                                size={12}
                                autoFocus={true}
                                error={errors && errors.username} />
                            <FormInput
                                name="password"
                                label="Password"
                                value={account.password}
                                onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors.password} />

                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={validate()}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default LoginForm
