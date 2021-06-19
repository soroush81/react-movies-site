import React from 'react'
import { Badge, Button } from '@material-ui/core'


const Counter = (props) => {

    const buttonStyle = { marginLeft: 20, marginTop: 20 }

    const formatCount = () => {
        return props.counter.value === 0 ? "Zero" : props.counter.value;
    }


    return (
        <>
            <div>
                <Button onClick={() => props.onIncrement(props.counter)} variant="contained" style={buttonStyle}>+</Button>
                <Button onClick={() => props.onDecrement(props.counter)} disabled={props.counter.value === 0} variant="contained" style={buttonStyle}>-</Button>
                <Button onClick={() => props.onDelete(props.counter.id)} variant="contained" color="secondary" style={buttonStyle}>X</Button>
                <Badge variant="standard" badgeContent={formatCount()} color="primary" style={buttonStyle} />
            </div>
        </>
    )
}

export default Counter
