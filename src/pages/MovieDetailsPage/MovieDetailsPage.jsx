import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../../service/fetchAPI';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        fetchMovieDetails(movieId)
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Error fetching movie details:', error);
            });
    }, [movieId]);

    if (loading) {
        return <Loader />;
    }

    if (!movie) {
        return <p>Movie details not found.</p>;
    }

    return (
        <div className={styles.container}>
            <ButtonBack />
            <div className={styles.movieDetails}>
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300'}
                    alt={movie.title}
                />
                <div className={styles.details}>
                    <h2>{movie.title}</h2>
                    <p>User score: {movie.vote_average * 10}%</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <ul>
                        {movie.genres.map(genre => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.additionalInfo}>
                <h3>Additional Information</h3>
                <ul>
                    <li>
                        <Link to="cast">Cast</Link>
                    </li>
                    <li>
                        <Link to="reviews">Reviews</Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
