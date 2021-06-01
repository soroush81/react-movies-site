import http from '../../services/httpService'
import config from '../../config.json'

let posts = []
export async function getPosts() {
    const { data } = await http.get(config.apiEndPoint);
    posts = data;
    return posts
}

export async function getPost(id) {
    return posts.find(p => p.id == id)
}

export async function savePost(post) {
    if (post.id == 0) {
        const { data: savedPost } = await http.post(config.apiEndPoint, post)
        posts = {savedPost, ...posts}
    }   
    else {
        const { data: savedPost } = await http.put(config.apiEndPoint + '/' + post.id, post)
        const index = posts.findIndex(p => p.id == post.id);
        posts[index] = { ...savedPost }
    }

    return posts;
}

