import { Route, Routes } from "react-router-dom";
import "./App.css";
import ShowMovies from "./components/ShowMovies";
import { useContext, useEffect } from "react";
import MoviesContext from "./storage/MoviesContext";
import { getMovies } from "./service/moviesService";
import SignUp from "./register/SignUp";
import UserContext from "./storage/UserContext";
import SignIn from "./register/SignIn";
import Home from "./components/Home";
import ShowSingleMovie from "./components/ShowSingleMovie";
import AddMovie from "./components/AddMovie";
import ProtectedRoute from "./shared/ProtectedRoute";

function App() {
  const movieContext = useContext(MoviesContext);
  const { signedIn } = useContext(UserContext);

  useEffect(() => {
    if (signedIn) {
      getMovies().then(({ data }) => {
        movieContext.updateMovie(data);
      });
    }
  }, [signedIn]);

  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <ShowMovies />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/register" element={<SignUp />}></Route>
      <Route path="/login" element={<SignIn />}></Route>
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <ShowSingleMovie />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/movies/edit/:id"
        element={
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;