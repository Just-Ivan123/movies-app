import { useState } from "react";
import { addMovie } from "../service/moviesService";
import MoviesContext from "./MoviesContext";

const MovieProvider = ({ children }) => {
  const [movieState, setMovieState] = useState([]);

  const postNewMovie = (movie) => {
    const existingMovie = movieState.find((c) => c.title === movie.title);
    if (existingMovie) {
      return;
    }
    addMovie(movie).then(({ data }) => {
      setMovieState((prevState) => [...prevState, data]);
    });
  };

  const movieContext = {
    movies: movieState,
    updateMovie: setMovieState,
    addMovie: postNewMovie,
  };
  return (
    <MoviesContext.Provider value={movieContext}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MovieProvider;