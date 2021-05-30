import React, { useState, useEffect } from 'react'
import { InputLabel, FormControl, Select, MenuItem, Grid } from '@material-ui/core';

const FormSelect = ({ items, id, labelId, label, size, onChange }) => {

    return (
        <>
            <Grid item xs={size}>
                <FormControl style={{ width: "100%" }}>
                    <InputLabel id={labelId}>{label}</InputLabel>
                    <Select
                        labelId={labelId}
                        id={id}
                        name={id}
                        value={items.value}
                        onChange={onChange}
                        fullWidth
                    >
                        {items.map(item => (
                            <MenuItem value={item._id} key={item._id}>{item.value}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Grid>

        </>
    )
}

export default FormSelect
