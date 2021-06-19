import React, { useState, useEffect } from 'react'
import http from '../../services/httpService'
import PostsTable from './postsTable'
import { Box, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Pagination from '../common/pagination'
import { paginate } from '../../utils/paginate'
import config from '../../config.json'
import { getPosts } from '../../services/postService'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Posts = ({ history }) => {
    const [posts, setPosts] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn)
    }

    const handleDelete = async (post) => {
        const originalPosts = posts;
        const filtered = posts.filter(p => p.id !== post.id);
        setPosts(filtered);
        try {
            await http.delete(config.apiEndPoint + `/${post.id}`);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404)
                alert('This post has already been deleted')
            setPosts(originalPosts);
        }

    }

    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.innerText));
    }

    useEffect(async () => {
        const posts = await getPosts();
        if (history.location.state != null && history.location.state.posts) {
            const _posts = history.location.state.posts
            setPosts(_posts)
        }
        else
            setPosts(posts)

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
            <ToastContainer />
            <Box style={{ margin: "0 auto", width: "50%" }}>
                <Box m={2}>
                    <IconButton component={Link} to="/posts/new" variant="contained" color="primary"><AddIcon /></IconButton>
                </Box>
                <Box m={2}>
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
                </Box>
            </Box>
        </>
    )
}

export default Posts
