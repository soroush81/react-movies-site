import React from 'react'
import { Table, TableContainer, Paper } from '@material-ui/core';
import CustomTableHeader from './tableHeader'
import CustomTableBody from './tableBody'

const CustomTable = ({ onSort, columns, sortColumn, data }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="movies">
                    <CustomTableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
                    <CustomTableBody data={data} columns={columns} />
                </Table>
            </TableContainer>
        </>
    )
}

export default CustomTable;
