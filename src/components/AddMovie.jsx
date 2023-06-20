import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMovie,
  editMovieById,
  getMovieById,
} from "../service/moviesService";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    image_url: "",
    duration: "",
    release_date: "",
    genre: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMovieById(id).then(({ data }) => {
        setMovie(data);
      });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (movie.title.length === 0) {
      return alert(`Title cannot be empty`);
    }
    if (movie.director.length === 0) {
      return alert(`Director cannot be empty`);
    }
    if (movie.image_url.length === 0) {
      return alert(`Image cannot be empty`);
    }
    if (movie.duration.length === 0) {
      return alert(`Duration cannot be empty`);
    }
    if (movie.duration < 1 || movie.duration > 300) {
      return alert(`Duration cannot be empty`);
    }
    if (movie.release_date.length === 0) {
      return alert(`Release cannot be empty`);
    }
    if (movie.genre.length === 0) {
      return alert(`Genre cannot be empty`);
    }
    if (id) {
      editMovieById(id, movie);
    } else {
      addMovie(
        movie.title,
        movie.director,
        movie.image_url,
        movie.duration,
        movie.release_date,
        movie.genre
      );
      setMovie({
        title: "",
        director: "",
        image_url: "",
        duration: "",
        release_date: "",
        genre: "",
      });
    }
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <form
        className="container mt-5"
        style={{ width: "300px" }}
        onSubmit={(event) => handleSubmit(event, movie)}
      >
        <div className="form-floating mt-3">
          <input
            name="title"
            value={movie.title}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Title"
          />
          <label>Title</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="director"
            value={movie.director}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Director"
          />
          <label>Director</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="image_url"
            value={movie.image_url}
            type="url"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Image url"
          />
          <label>Image url</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="duration"
            value={movie.duration}
            type="number"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Duration"
          />
          <label>Duration</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="release_date"
            value={movie.release_date}
            type="date"
            className="form-control"
            onChange={handleInputChange}
          />
          <label>Release date</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="genre"
            value={movie.genre}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Genre"
          />
          <label>Genre</label>
        </div>
        <div>
          {id ? (
            <button
              className="w-100 btn btn-lg btn-warning mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Edit
            </button>
          ) : (
            <button
              className="w-100 btn btn-lg btn-success mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default AddMovie;