import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button , Modal } from "react-bootstrap";
import "../App.css";

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=05827e955d105f54b72d04df596eb440";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [expandedCarouselMovie, setExpandedCarouselMovie] = useState(null);


  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("this is the data from the api", data);
        setMovies(data.results);
      });
  }, []);

  return (
    <div className="container">
      <div className="carousel-container mx-auto mb-4">
        <Carousel className="custom-carousel">
          {movies.slice(0, 3).map((movie) => {
            return (
              <Carousel.Item key={movie.id}>
                <img
                  className="d-block w-100 carousel-image"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                    <Carousel.Caption className="carousel-caption">
  <div className="carousel-content">
    <div>
      <h3>{movie.title   +" " + "("+ movie.release_date.substring(0, 4) + ")"}</h3>
     
    </div>
    <Button button type="button" className="btn btn-dark"
      
      size="sm"
      onClick={() => setExpandedCarouselMovie(movie)}
    >
      See More
    </Button>
  </div>
</Carousel.Caption>
       <Modal show={expandedCarouselMovie !== null} onHide={() => 
          setExpandedCarouselMovie(null)}
             backdrop="static"
                   >
       <Modal.Header closeButton>
       <Modal.Title>{expandedCarouselMovie?.title}</Modal.Title>
               </Modal.Header>
                    <Modal.Body>  
               {expandedCarouselMovie && (
                    <Movie movie={expandedCarouselMovie} expanded={true} />
                  )}
           </Modal.Body>
                     </Modal>
                
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>

      <div className="grid">
        {movies.slice(3).map((movie) => {
          return (
            <Movie
              key={movie.id}
              movie={movie}
              expanded={expandedMovie === movie.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;