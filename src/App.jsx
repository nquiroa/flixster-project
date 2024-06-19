import { useState, useEffect } from "react";
import MovieList from "./Components/MovieList/MovieList";
import Searchbar from "./Components/Searchbar/Searchbar";
import "./App.css";

const apiKey = import.meta.env.VITE_API_KEY;

const App = () => {
  const [searchquery, setsearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [resetMovies, setResetMovies] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchChange = (event) => {
    setsearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setResetMovies(true); 
    setIsSearch(true);
  };

  const handleSearchClick = () => {
    setPage(1);
    setIsSearch(true);
    setsearchQuery('');
    setResetMovies(true);
  };

  const handleNowPlaying = () => {
    setPage(1);
    setIsSearch(false);
    setsearchQuery('');
    setResetMovies(true);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setPage(1);
    setResetMovies(true);
  };

  const handlePageChange = (event) => {
    const newPage = parseInt(event.target.value, 10);
    if (!isNaN(newPage) && newPage > 0) {
      setPage(newPage);
      setResetMovies(true);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Flixster</h1>
      </header>
      <main>
        <div className="controls">
          <button onClick={handleNowPlaying} disabled={!isSearch}>Now Playing</button>
          <button onClick={handleSearchClick} disabled={isSearch}>Search</button>
          <select onChange={handleGenreChange} value={selectedGenre}>
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
          <label htmlFor="page-input">Page: </label>
          <input 
            type="number" 
            id="page-input" 
            value={page} 
            onChange={handlePageChange} 
            min="1"
          />
        </div>
        {isSearch && (
          <Searchbar
            searchQuery={searchquery}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
        <MovieList 
          isSearch={isSearch} 
          searchQuery={searchquery} 
          resetMovies={resetMovies} 
          setResetMovies={setResetMovies} 
          selectedGenre={selectedGenre} 
          genres={genres}
          page={page}
        />
      </main>
      <footer>
          <p>&copy;Flixster</p>
      </footer>
    </div>
  );
};

export default App;
