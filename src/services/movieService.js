import http from './httpService'
import {apiUrl} from '../config.json'
import { getGenres } from './genreService';

let movies = []

export async function getMovies() {
    const {data} = await http.get(apiUrl+"/movies");
    movies = data;
    return movies;
}

export async function getMovie(id) {
    const {data} = await http.get(apiUrl+"/movies/"+id);
    return data;
  //  return movies.find(m => m._id == id)
}

export async function deleteMovie(id){
    return await http.delete(apiUrl+"/movies"+"/"+id)
}

export async function saveMovie(movie) {
    if (movie._id) {
        const body = {...movie};
        delete body._id
        return await http.put(apiUrl+"/movies" + '/' + movie._id, body)
    }
    return await http.post(apiUrl+"/movies", movie)


}