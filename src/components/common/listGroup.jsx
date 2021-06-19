import React from 'react'
import { ListSubheader, List, ListItem, ListItemText, Typography, Box, Divider, withStyles } from '@material-ui/core';

const StyledListItem = withStyles({
    root: {
        "&.Mui-selected": {
            backgroundColor: "orange"
        }
    },
})(ListItem);
const ListGroup = ({ items, onItemSelect, textProperty, valueProperty, selectedItem }) => {
    return (
        <>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Box>
                            <Typography variant="h6">Genres</Typography>
                        </Box>
                    </ListSubheader>
                }
            >
                {items.map(item => (
                    <>
                        <StyledListItem selected={selectedItem === item} button key={item[valueProperty]} onClick={() => onItemSelect(item)}>
                            <ListItemText><Typography variant="caption">{item[textProperty]}</Typography></ListItemText>
                        </StyledListItem>
                        <Divider />
                    </>
                ))}
            </List>

        </>
    )
};


ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
export default ListGroup;
