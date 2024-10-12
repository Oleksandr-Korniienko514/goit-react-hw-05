
const API_KEY = '9b8066abd96eadfb2ba42c632933d8fb';
const BASE_URL = 'https://api.themoviedb.org/3/';

export const fetchTrending = async () => {
    const response = await fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`);
    return response.json();
};

export const fetchSearchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`);
    return response.json();
};

export const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`);
    return response.json();
};

export const fetchMovieCast = async (movieId) => {
    const response = await fetch(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.json();
};


export const fetchMovieReviews = async (movieId) => {
    const response = await fetch(`${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}`);
    return response.json();
};
