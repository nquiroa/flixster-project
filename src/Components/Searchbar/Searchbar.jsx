import PropTypes from 'prop-types';
import './Searchbar.css'

const Searchbar = ({ searchQuery, handleSearchChange, handleSearchSubmit }) => {
    
    return (
        <form className="searchbar" onSubmit={handleSearchSubmit}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a movie..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

Searchbar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
    handleSearchSubmit: PropTypes.func.isRequired
};

export default Searchbar;
