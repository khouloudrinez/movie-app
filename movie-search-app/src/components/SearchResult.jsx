import React , {useState, useEffect} from "react";
import Movie from "./Movie";
import { Spinner } from "react-bootstrap";

const SearchResult = ({ movies, searchQuery }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="container">
       {isLoading ? (
        <div className="d-flex justify-content-center">
<Spinner animation="border"  role="status" style={{width: '3rem', height: '3rem' , color: 'white'}}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : ( 
        <>
      <h2>Search results for "{searchQuery}"</h2>
      <p>{movies.length} movies found</p>
      <div className="grid">
        {movies.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
      </>
   
  )};
  </div> )
};

export default SearchResult;
