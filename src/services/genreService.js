import http from './httpService'

let genres = [];
const apiEndPoint = "/genres"
export async function getGenres() {
    const { data } = await http.get(apiEndPoint)
    genres = data
    return genres;
}