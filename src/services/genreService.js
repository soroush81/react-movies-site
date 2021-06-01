import http from './httpService'
import {apiUrl} from '../config.json'

let genres = [];
export async function getGenres() {
    const {data} = await http.get(apiUrl+'/genres')
    genres = data
    return genres;
}