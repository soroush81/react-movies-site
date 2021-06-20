import React from 'react'
import { Box, Hidden } from '@material-ui/core';
import ListGroup from '../common/listGroup'

const GenreList = ({ data, selectedGenre, onGenreSelect }) => {
    return (
        <>
            <Hidden smDown>
                <Box p={1} xs={2} style={{ width: '15%' }}>
                    <ListGroup items={data} selectedItem={selectedGenre} onItemSelect={onGenreSelect} />
                </Box>
            </Hidden>
        </>
    )
}

export default GenreList
