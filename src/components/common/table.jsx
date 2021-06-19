import React from 'react'
import { Table, TableContainer, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import CustomTableHeader from './tableHeader'
import CustomTableBody from './tableBody'

const useStyles = makeStyles(theme => ({
    tableContainer: {
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: "600px"
        },
        "@media (min-width: 1280px)": {
            width: "800px"
        }
    }
}));
const CustomTable = ({ onSort, columns, sortColumn, data }) => {
    const classes = useStyles()
    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="data" style={{ fontSize: "5px" }}>
                    <CustomTableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
                    <CustomTableBody data={data} columns={columns} />
                </Table>
            </TableContainer>
        </>
    )
}

export default (CustomTable);
