import { useContext, useEffect, useState } from "react";
import MoviesContext from "../storage/MoviesContext";
import { deleteMovieById, getMovies } from "../service/moviesService";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../storage/UserContext";

const ShowMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { movies, updateMovie } = useContext(MoviesContext);
  const { signedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(currentPage).then(({ data }) => {
      updateMovie(data.data);
      setLastPage(data.last_page);
    });
    if (!signedIn) {
      navigate("/login");
    }
  }, [currentPage]);

  const handleDelete = (id) => {
    if (signedIn) {
      deleteMovieById(id);
      getMovies(currentPage).then(({ data }) => {
        updateMovie(data.data);
        setLastPage(data.last_page);
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    // console.log(lastPage);
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <nav
        className="d-flex justify-content-center"
        aria-label="Page navigation example"
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToNextPage}
              disabled={currentPage === 6}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Array.isArray(movies)
          ? movies.map((movie, id) => (
              <div key={id} className="col m-5" style={{ width: "340px" }}>
                <div className="card shadow-sm">
                  <div className="card-body bg-light border rounded border">
                    <img
                      src={movie.image_url}
                      className="card-img-top"
                      alt={`${movie.title}`}
                      width="100"
                      height="300"
                    />
                    <h3 className="card-text">{movie.title}</h3>
                    <div className="mb-1 text-body-secondary">
                      Director: {movie.director}
                    </div>
                    <p className="card-text mb-auto">
                      Release date: {movie.release_date}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Link
                        className="btn btn-outline-success"
                        to={`/movies/${movie.id}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-warning"
                        to={`edit/${movie.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger"
                        type="delete"
                        onClick={() => handleDelete(movie.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <nav
        className="d-flex justify-content-center"
        aria-label="Page navigation example"
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">Page {currentPage}</span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={goToNextPage}
              disabled={currentPage === lastPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default ShowMovies;