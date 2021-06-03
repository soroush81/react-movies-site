import http from './httpService'
import { apiUrl } from '../config.json'

let genres = [];
const apiEndPoint = `${apiUrl}/genres`
export async function getGenres() {
    const { data } = await http.get(apiEndPoint)
    genres = data
    return genres;
}