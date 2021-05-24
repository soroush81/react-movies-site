import React from 'react'
import { Button } from '@material-ui/core'

const MovieForm = ({ match, history }) => {
    return (
        <>
            <h1>Movie Form {match.params.id}</h1>
            <Button color="secondary" variant="contained" onClick={() => history.push('/movies')} >Save</Button>
        </>
    )
}

export default MovieForm
