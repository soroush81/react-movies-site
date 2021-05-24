import React from 'react'
import Counter from './counter';
import { Button } from '@material-ui/core';
const Counters = (props) => {
    return (
        <>
            <div>
                <Button variant="contained" color="primary" size="large" onClick={props.onReset}>Reset</Button>
                {props.counters.map(c => (
                    <Counter
                        key={c.id}
                        counter={c}
                        onDelete={props.onDelete}
                        onIncrement={props.onIncrement}
                        onDecrement={props.onDecrement} />
                ))}</div>
        </>
    )
}

export default Counters
