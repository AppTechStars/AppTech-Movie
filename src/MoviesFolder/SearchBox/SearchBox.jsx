import  '../SearchBox/SearchBox.css';
const SearchBox = ({ currentPage }) => {
    return (
      <div>
        <div className="page-indicator">Page {currentPage}</div>
        <SearchBox>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
            <Search />
          </button>
        </SearchBox>
      </div>
    );
  };
  