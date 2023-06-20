import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../service/moviesService";

const ShowSingleMovie = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMovieById(id).then(({ data }) => {
        setMovie(data);
      });
    }
  }, [id]);

  return (
    <div className="d-flex justify-content-center">
      <div className="card " style={{ width: "300px" }}>
        <div className="card-body">
          <img
            src={movie.image_url}
            className="card-img-top"
            alt={`${movie.title}`}
          />
          <h2 className="card-title">{movie.title}</h2>
          <p className="card-text">Direktor: {movie.director}</p>
          <p className="card-text">Datum izlaska: {movie.release_date}</p>
          <p className="card-text">Trajanje filma: {movie.duration} mins</p>
          <p className="card-text">Zanr: {movie.genre}</p>
        </div>
      </div>
    </div>
  );
};
export default ShowSingleMovie;