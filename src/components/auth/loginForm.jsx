import React, { useState } from 'react'
import { Paper, Grid, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../common/formInput'

const LoginForm = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userName);
    }

    const methods = useForm();
    return (
        <>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "450px" }} onSubmit={handleSubmit}>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <FormInput name="userName" autoFocus="true" label="UserName" value={userName} onChange={(event) => { setUserName(event.target.value) }} required size="12" />
                            <FormInput name="password" label="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} required size="12" />
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit">Submit</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default LoginForm
