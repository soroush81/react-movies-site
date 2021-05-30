import React from 'react'

const SearchBox = ({ value, onChange }) => {
    return (
        <>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                placeHolder="Search..."
                name="search"
                type="text" />
        </>
    )
}

export default SearchBox;
