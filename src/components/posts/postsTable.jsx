import React from 'react'
import { Button } from '@material-ui/core'
import CustomTable from '../common/table';
import { Link } from 'react-router-dom'
import auth from '../../services/authService'
const PostsTable = ({ posts, onDelete, onSort, sortColumn }) => {
    const user = auth.getCurrentUser();
    const adminVisible = (user && user.isAdmin) ? true : false
    const bodyStyle = {
        width: "100px"
    }
    const columns = [
        { path: "id", label: "id" },
        { path: "title", label: "Title" },
        { path: "body", label: "Body", styleClass: { bodyStyle } },
        { key: "update", adminVisible, content: post => <Button component={Link} to={`/posts/${post.id}`} variant="contained" color="primary">Update</Button> },
        { key: "delete", adminVisible, content: post => <Button variant="contained" color="secondary" onClick={() => onDelete(post)}>Delete</Button > }
    ];

    return (
        <>
            <CustomTable onSort={onSort} sortColumn={sortColumn} data={posts} columns={columns} />
        </>
    )
}

export default PostsTable
