import { useState, useEffect } from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = `https://api.themoviedb.org/3`;

const MovieList = ({ isSearch, searchQuery, resetMovies, setResetMovies, selectedGenre, genres, page }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchMovies = async (pageNumber, isSearch, query, genre) => {
            setLoading(true);
            let url;
            let allMovies = [];
            let currentPage = pageNumber;

            while (allMovies.length < 20) {
                if (isSearch && query) {
                    url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`;
                } else if (genre) {
                    url = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${currentPage}`;
                } else {
                    url = `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${currentPage}`;
                }

                const res = await fetch(url);
                const data = await res.json();
                console.log("Fetched data:", data);

                let filteredMovies = data.results;
                if (genre) {
                    filteredMovies = filteredMovies.filter(movie => movie.genre_ids.includes(parseInt(genre)));
                }

                allMovies = [...allMovies, ...filteredMovies];
                if (data.page >= data.total_pages) {
                    break;
                }
                currentPage++;
            }

            setMovies(allMovies.slice(0, 20));
            setLoading(false);
        };

        fetchMovies(page, isSearch, searchQuery, selectedGenre);
        setResetMovies(false);
    }, [page, isSearch, searchQuery, resetMovies, setResetMovies, selectedGenre]);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMovie(null);
    };

    const getGenreNames = (genreIds) => {
        return genreIds.map(id => {
            const genre = genres.find(g => g.id === id);
            return genre ? genre.name : '';
        }).join(', ');
    };

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                    <MovieCard movie={movie} />
                </div>
            ))}
            {loading && <p>Loading...</p>}
            <Modal show={showModal} onClose={handleCloseModal}>
                {selectedMovie && (
                    <div className="movie-details">
                        <img src={`https://media.themoviedb.org/t/p/w500/${selectedMovie.poster_path}`} alt={`${selectedMovie.title} poster`}/> 
                        <h2>{selectedMovie.title}</h2>
                        <p>{selectedMovie.overview}</p>
                        <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                        <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
                        <p><strong>Genres:</strong> {getGenreNames(selectedMovie.genre_ids)}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

MovieList.propTypes = {
    isSearch: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string.isRequired,
    resetMovies: PropTypes.bool.isRequired,
    setResetMovies: PropTypes.func.isRequired,
    selectedGenre: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
};

export default MovieList;
