// import './normalize.css';
import './movie.css';

function Movie() {
  return (
    <div className="movie-card">
      <div>
        <img src="Movie.png" alt="Poster" />
      </div>
      <div className="movie-right">
        <h2 className="movie-name">The way back</h2>
        <div className="movie-date">March 5. 2020</div>
        <div className="movie-all-class">
          <div className="movie-class">Action</div>
          <div className="movie-class">Drama</div>
        </div>
        <p className="movie-desc">
          A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
        </p>
      </div>
    </div>
  );
}

export default Movie;
