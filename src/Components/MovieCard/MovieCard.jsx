// MovieCard.jsx
import './MovieCard.css'
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={`https://media.themoviedb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} poster`} />
            <h2>{movie.title}</h2>
            <p>Rating: {movie.vote_average}</p>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        poster_path: PropTypes.string,
        title: PropTypes.string,
        vote_average: PropTypes.number,
    }).isRequired,
};

export default MovieCard;
