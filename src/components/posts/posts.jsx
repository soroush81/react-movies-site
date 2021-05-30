import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostsTable from './postsTable'
import { Box, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Pagination from '../common/pagination'
import { paginate } from '../../utils/paginate'


const apiEndPoint = "http://jsonplaceholder.typicode.com/posts"
const Posts = ({ history }) => {
    const [posts, setPosts] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn)
    }

    const handleDelete = async (post) => {
        await axios.delete(apiEndPoint + '/' + post.id)
        const filtered = posts.filter(p => p.id !== post.id)
        console.log(filtered)
        setPosts(filtered)
    }

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.innerText))
    }

    useEffect(async () => {
        const { data: posts } = await axios.get(apiEndPoint);
        setPosts(posts)
        if (history.location.state != null && history.location.state.post) {
            const _post = history.location.state.post
            if (history.location.state.new === "new") {
                setPosts([_post, ...posts])
            }
            else {
                const _posts = posts
                const index = _posts.findIndex(p => p.id == _post.id)
                _posts[index] = { ..._post }
                setPosts(_posts)
            }
        }

    }, []);

    const getPagedData = () => {
        const sorted = _.orderBy(posts, [sortColumn.path], [sortColumn.order])
        let pagedPosts = paginate(sorted, currentPage, pageSize);

        return { totalCount: posts.length, pagedPosts: pagedPosts }
    }

    const { totalCount, pagedPosts } = getPagedData()
    if (posts.length === 0) return <p>There is no post in the list</p>
    return (
        <>
            <Box m={2} />
            <Button component={Link} to="/posts/new" variant="contained" color="primary">Add Post</Button>
            <Box m={2} />
            <PostsTable
                posts={pagedPosts}
                onSort={handleSort}
                sortColumn={sortColumn}
                onDelete={handleDelete} />
            <Pagination
                itemsCount={totalCount}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange} />

        </>
    )
}

export default Posts
