import React from 'react'
import { ListSubheader, List, ListItem, ListItemText, ListItemIcon, Typography, Box, Divider } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
const ListGroup = ({ items, onItemSelect, textProperty, valueProperty, selectedItem }) => {
    return (
        <>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Typography variant="h4">Genres</Typography>
                        <Box m={2} />
                    </ListSubheader>
                }
            >
                {items.map(item => (
                    <>
                        <ListItem selected={selectedItem === item} button key={item[valueProperty]} onClick={() => onItemSelect(item)}>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary={item[textProperty]} />
                        </ListItem>
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
