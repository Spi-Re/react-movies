import { Component } from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import Movie from '../movie';
import 'antd/dist/antd.css';
import './movieList.css';
import MovieService from '../services/MoviesService';

export default class MovieList extends Component {
  service = new MovieService();

  constructor() {
    super();

    this.state = {
      body: [],
      loading: true,
      error: false,
      searchValue: '',
      currentPage: 1,
      totalPages: 50,
      arrOfGenresFromServer: null,
    };

    // загрузка жанров
    this.getArrOfJenresFromServer = () => {
      this.service.getJenres().then((elem) => {
        this.setState({
          arrOfGenresFromServer: elem.genres,
        });
      });
    };
  }

  componentDidMount() {
    this.getArrOfJenresFromServer();
    this.updateMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { putSearchValue, putCurrentPage } = this.props;
    if (prevState.searchValue !== putSearchValue || prevState.currentPage !== putCurrentPage) {
      new Promise((resolve) => {
        this.setState({
          loading: true,
          searchValue: putSearchValue,
          currentPage: putCurrentPage,
        });
        resolve();
      }).then(() => {
        this.updateMovies();
      });
    }
  }

  updateMovies() {
    const { putSearchValue, putCurrentPage, getTotalPages } = this.props;
    const { totalPages } = this.state;
    this.service
      .getSearchMovies(putSearchValue, putCurrentPage)
      .then((bodyAll) => {
        this.setState(() => ({
          body: [...bodyAll.res],
          loading: false,
          error: false,
          totalPages: bodyAll.totalPages,
        }));
        getTotalPages(totalPages);
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    const { getMovieIdFromDOM, putRateMoviesToServ, getRatedMoviesFromServer } = this.props;

    const { arrOfGenresFromServer } = this.state;

    const { body, loading, error } = this.state;
    const empty = body.length === 0 && !loading;
    const setData = !(error || loading || empty);

    const emptyResult = empty ? <EmptyResult /> : null;
    const MovieComponent = setData ? (
      <MovieFile
        arrOfGenresFromServer={arrOfGenresFromServer}
        getRatedMoviesFromServer={getRatedMoviesFromServer}
        bodyMovie={body}
        getMovieIdFromDOM={getMovieIdFromDOM}
        putRateMoviesToServ={putRateMoviesToServ}
      />
    ) : null;
    const SpinLoader = loading ? <Spin /> : null;
    const ErrorLoader = error ? <Alert /> : null;

    return (
      <>
        <Online>
          <section className="movie-list">
            {MovieComponent}
            {SpinLoader}
            {ErrorLoader}
            {emptyResult}
          </section>
        </Online>
        <Offline>Отсутствует интернет соединение</Offline>
      </>
    );
  }
}

function EmptyResult() {
  return <>Поиск не дал результатов</>;
}

function MovieFile({
  bodyMovie,
  getMovieIdFromDOM,
  putRateMoviesToServ,
  getRatedMoviesFromServer,
  arrOfGenresFromServer,
}) {
  return (
    <>
      {bodyMovie.map((elem) => (
        <Movie
          arrOfGenresFromServer={arrOfGenresFromServer}
          getRatedMoviesFromServer={getRatedMoviesFromServer}
          putRateMoviesToServ={putRateMoviesToServ}
          getMovieIdFromDOM={getMovieIdFromDOM}
          vote={elem.vote_average}
          genresMovieId={elem.genre_ids}
          key={elem.id}
          id={elem.id}
          name={elem.original_title}
          date={elem.release_date}
          desc={elem.overview}
          img={elem.poster_path}
        />
      ))}
    </>
  );
}
