import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../../service/fetchAPI';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null); // 

    const query = searchParams.get('query') || '';

    useEffect(() => {
        if (query) {
            fetchSearchMovies(query)
                .then(({ results }) => {
                    if (results.length > 0) {
                        setMovies(results);
                        setError(null); // 
                    } else {
                        setError("Movie not found");
                    }
                })
                .catch(() => {
                    setError("Error fetching movies");
                });
        } else {
            setMovies([]);
            setError(null);
        }
    }, [query]);

    const handleSearch = (newQuery) => {
        setSearchParams({ query: newQuery });
    };

    return (
        <div className={styles.container}>
            <SearchForm onSearch={handleSearch} />
            {error && <p className={styles.error}>{error}</p>}
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
