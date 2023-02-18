import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search.."
        />
        <Link to={`/search/${encodeURIComponent(searchTerm)}`}>
          <button type="submit" style={{ color: "white" }}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
