const movies = [
    {
        _id: 1,
        title: "Terminator",
        genre: { _id: 1, name: "Action" },
        numberInStock: 4,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: true
    },
    {
        _id: 2,
        title: "Die Hard",
        genre: { _id: 1, name: "Action" },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: false
    },
    {
        _id: 3,
        title: "Gone Girl",
        genre: { _id: 1, name: "Action" },
        numberInStock: 4,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: true
    },
    {
        _id: 4,
        title: "Mr Nobody",
        genre: { _id: 2, name: "Romance" },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: false
    },
    {
        _id: 5,
        title: "12 Angry Man",
        genre: { _id: 3, name: "Comedy" },
        numberInStock: 4,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: true
    },
    {
        _id: 6,
        title: "Die Hard 2",
        genre: { _id: 1, name: "Action" },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: false
    },
    {
        _id: 7,
        title: "Ocean Eleven",
        genre: { _id: 3, name: "Comedy" },
        numberInStock: 4,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: true
    },
    {
        _id: 8,
        title: "Die Hard 3",
        genre: { _id: 1, name: "Action" },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: "2021-05-19",
        like: false
    }
]

const genres = [
    { _id: 1, value: "Action" },
    { _id: 3, value: "Comedy" },
    { _id: 2, value: "Romance" }];

export function getMovies() {
    return movies;
}

export function getGenres() {
    return genres;
}

export function getMovie(id) {
    return movies.find(m => m._id === id)
}

// export function saveMovie(movie) {
//     let movieInDb = movies.find(m => m._id === movie._id) || {};
//     movieInDb.name = movie.name;
//     movieInDb.genre = movie.genre;
//     movieInDb.numberInStock = movie.numberInStock;
//     movieInDb.dailyRentalRate = movie.find;
// }