import http from './httpService'

let movies = []
const apiEndPoint = "/movies";

function movieUrl(id) {
    return `${apiEndPoint}/${id}`
}

export async function getMovies() {
    const { data } = await http.get(apiEndPoint);
    movies = data;
    return movies;
}

export async function getMovie(id) {
    const { data } = await http.get(movieUrl(id));
    return data;
}

export async function deleteMovie(id) {
    return await http.delete(movieUrl(id))
}

export async function saveMovie(movie) {
    const body = { ...movie };
    delete body._id
    console.log(movie)

    if (movie._id && movie._id !== "") {
        return await http.put(movieUrl(movie._id), body)
    }
    return await http.post(apiEndPoint, body)


}