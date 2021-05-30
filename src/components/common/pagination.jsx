import React from 'react'
import Pagination from '@material-ui/lab/pagination';

const CustomPagination = ({ itemsCount, currentPage, pageSize, onPageChange, ...props }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    return (
        <>
            <Pagination
                count={pagesCount}
                page={currentPage}
                onChange={(event) => onPageChange(event)}
                color="primary"
                {...props} />
        </>
    )
}

export default CustomPagination
