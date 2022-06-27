/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { PureComponent } from 'react';

import Movie from '../movie';
import MovieService from '../services/MoviesService';

const movieService = new MovieService();

export default class MovieFile extends PureComponent {
  constructor(props) {
    super(props);
    const { ratedMovies } = this.props;
    this.state = {
      movies: ratedMovies,
    };

    this.componentDidMount = () => {
      this.getRatedMoviesFromServer();
    };

    this.componentDidUpdate = (prevProps, prevState) => {
      const { movies } = this.state;
      if (prevState.movies !== movies) {
        this.getRatedMoviesFromServer();
      }
    };

    this.getRatedMoviesFromServer = () => {
      movieService.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId'))).then((movie) =>
        this.setState(() => ({
          movies: [...movie],
        }))
      );
    };
  }

  render() {
    const { arrOfGenresFromServer } = this.props;
    const { movies } = this.state;

    return (
      <>
        {movies.map((elem) => (
          <Movie
            arrOfGenresFromServer={arrOfGenresFromServer}
            genresMovieId={elem.genre_ids}
            vote={elem.vote_average}
            id={elem.id}
            name={elem.original_title}
            date={elem.release_date}
            desc={elem.overview}
            img={elem.poster_path}
            key={elem.id}
          />
        ))}
      </>
    );
  }
}
