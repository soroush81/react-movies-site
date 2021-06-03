import http from './httpService'
import config from '../config.json'

let posts = []
export async function getPosts() {
    const { data } = await http.get(config.apiEndPoint);
    posts = data;
    return posts
}

export async function getPost(id) {
    console.log(posts)
    const { data } = await http.get(config.apiEndPoint + '/' + id)
    return data;
}

export async function savePost(post) {
    console.log(post)
    if (post.id === 0) {
        const { data: savedPost } = await http.post(config.apiEndPoint, post)
        posts = { savedPost, ...posts }
    }
    else {
        const { data: savedPost } = await http.put(config.apiEndPoint + '/' + post.id, post)
        const index = posts.findIndex(p => p.id == post.id);
        posts[index] = { ...savedPost }
    }

    return posts;
}

