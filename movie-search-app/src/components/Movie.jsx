import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const Movie = ({ movie,expanded }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const releaseYear = movie.release_date.substring(0, 4);

  return (
    <div className="card text-center bg-danger mb-3">
      <div className="card-body">
        <img
          className="card-img-top"
          src={API_IMG + movie.poster_path}
          alt={movie.poster_path}
        />
        <div className="card-body">
          <h3>
            {movie.title} ({releaseYear})
          </h3>
          <button type="button" className="btn btn-dark" onClick={handleShow}>
            View More
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{movie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="card-img-top"
                style={{ width: "14rem" }}
                src={API_IMG + movie.poster_path}
                alt={movie.poster_path}
              />
              <h4>ImDb: {movie.vote_average}</h4>
              <h6>Overview: {movie.overview}</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Movie;