import React from 'react'
import { IconButton, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomTable from '../common/table';
import { Link } from 'react-router-dom'
import auth from '../../services/authService'
const PostsTable = ({ posts, onDelete, onSort, sortColumn }) => {
    const user = auth.getCurrentUser();
    const adminVisible = (user && user.isAdmin) ? true : false

    const columns = [
        // { path: "id", label: "id" },
        { path: "title", label: "Title" },
        // { path: "body", label: "Body", styleClass: { bodyStyle } },
        {
            key: "update", adminVisible, content: post => <IconButton component={Link} to={`/posts/${post.id}`} variant="contained" color="primary"><EditIcon /></IconButton>
        },
        { key: "delete", adminVisible, content: post => <IconButton variant="contained" color="secondary" onClick={() => onDelete(post)}><DeleteIcon /></IconButton > }
    ];

    return (
        <>
            <Box>
                <CustomTable onSort={onSort} sortColumn={sortColumn} data={posts} columns={columns} />
            </Box>
        </>
    )
}

export default PostsTable
