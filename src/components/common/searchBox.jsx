import React from 'react'
import { TextField } from '@material-ui/core'

const SearchBox = ({ value, onChange }) => {
    return (
        <>
            <TextField variant="outlined"
                style={{ width: "50%" }}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Search..."
                name="search"
                type="text" />
        </>
    )
}

export default SearchBox;
