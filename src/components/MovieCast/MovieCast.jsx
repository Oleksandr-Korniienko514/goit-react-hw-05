import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../service/fetchAPI';
import styles from './MovieCast.module.css';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (movieId) {
            fetchMovieCast(movieId)
                .then(data => {
                    if (data.cast) {
                        setCast(data.cast);
                    } else {
                        setError('Cast data not available');
                    }
                })
                .catch(() => setError('Failed to load cast data'));
        }
    }, [movieId]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>Cast</h3>
            {cast.length > 0 ? (
                <ul className={styles.list}>
                    {cast.map(actor => (
                        <li key={actor.cast_id} className={styles.item}>
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : 'https://via.placeholder.com/200x300'
                                }
                                alt={actor.name}
                                className={styles.image}
                            />
                            <p className={styles.name}>{actor.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No cast information available</p>
            )}
        </div>
    );
};

export default MovieCast;
