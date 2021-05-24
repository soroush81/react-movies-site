import React from 'react'
import Pagination from '@material-ui/lab/pagination';

const CustomPagination = ({ itemsCount, currentPage, pageSize, onPageChange }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    return (
        <>
            <Pagination
                count={pagesCount}
                page={currentPage}
                onChange={(event) => onPageChange(event)}
                color="primary" />
        </>
    )
}

export default CustomPagination
