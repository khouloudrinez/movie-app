import React, { useEffect, useState} from "react";
import SearchResult from "./components/SearchResult";
import Home from "./components/Home";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav , Form, FormControl} from "react-bootstrap";


const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=05827e955d105f54b72d04df596eb440"
const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=05827e955d105f54b72d04df596eb440&query"
const App = () => {

    const [movies, setMovies] = useState([]);
    const [search , setSearch] = useState();
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
      fetch(API_URL)
      .then((res) =>res.json())
      .then((data) => {
        console.log("this is the data from the api",data);
        setMovies(data.results);
      })
    }, []);

  const searchMovie = async(query) => { 
    
    console.log("searching");
    try { 
      const url = `https://api.themoviedb.org/3/search/movie?api_key=05827e955d105f54b72d04df596eb440&query=${query}` ;
      const res = await fetch(url);
      const data = await res.json();

      console.log(data); 
      const filteredMovies = data.results.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );

      setMovies(filteredMovies);

    } catch(e){
console.log(e);
    }
  }  
  

// to clear the home page while searching
  const handleFocus = () => {
    setShowResults(false);
  };

// update the value in the form after searching 
 const changeHandler =(e) => { 
  const query = e.target.value
  setSearch(query) ;
  
  if (query.trim() === "") {
    setShowResults(false);
  } else {
    setShowResults(true);
    searchMovie(query);
  }
 }

return (
  <>
  <Navbar bg="dark " expand="lg" variant="dark">
    <Container fluid>
      <Navbar.Brand href="/home"> MOVIENIGHT</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="navbarScroll">
      </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-3" 
          style= {{maxHeight:'100px'}}
          navbarScroll> 
          </Nav>
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <FormControl 
            type="search" 
            placeholder="Movie Search"
            className="me-2"
            aria-label="search"
            name="search"
            value={search} 
            onChange={changeHandler}
            onFocus={handleFocus}   
            ></FormControl>

            


          </Form>
        </Navbar.Collapse>
    

    </Container>
    
     </Navbar>
      
       {/* Display home page or search results */}
       {showResults ? (
        <SearchResult movies={movies} searchQuery={search} />
      ) : (
        <Home />
      )}
   </>
   
  );
};
export default App;