import React from 'react'

const Like = ({ like, onLikeToggle }) => {
    let classes = "fa fa-heart";
    if (!like) classes += "-o"
    return (
        <>
            <i className={classes}
                style={{ cursor: 'pointer' }}
                onClick={() => onLikeToggle()}
                aria-hidden="true"></i>
        </>
    )
}

export default Like
