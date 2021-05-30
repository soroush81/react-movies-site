import axios from 'axios'
const apiEndPoint = "http://jsonplaceholder.typicode.com/posts"
let posts = []
export async function getPosts() {
    const { data, status } = await axios.get(apiEndPoint);
    posts = data;
    return posts
}

export async function getPost(id) {
    const { data: posts, status } = await axios.get(apiEndPoint);
    return posts.find(p => p.id == id)
}

export async function savePost(post) {
    let savedPost = {}
    if (post.id == 0) {
        const { data: savedPost } = await axios.post(apiEndPoint, post)

    }
    else {
        console.log('put')
        const { data: savedPost } = await axios.put(apiEndPoint + '/' + post.id, post)
    }


    return savedPost;
}

