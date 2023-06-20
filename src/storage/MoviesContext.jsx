import { createContext } from "react";

const MoviesContext = createContext({
  movies: [],
  updateMovie: () => {},
  addMovie: () => {},
});

export default MoviesContext;