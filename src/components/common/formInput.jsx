import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required, size, value, onChange, autoFocus }) {
    const { control } = useFormContext();
    return (
        <Grid item xs={size}>
            <Controller
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label={label}
                        required
                        value={value}
                        onChange={onChange}
                        autoFocus={autoFocus}
                    />
                )}
                name={name}
                control={control}
            />
        </Grid>
    );
}

export default FormInput;