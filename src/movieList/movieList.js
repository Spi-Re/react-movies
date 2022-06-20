/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
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
      searchValue: null,
    };
  }

  componentDidMount() {
    this.updateMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevState.searchValue !== this.props.putSearchValue) {
      this.updateMovies();
    }
  }

  updateMovies() {
    this.service
      // eslint-disable-next-line react/destructuring-assignment
      .getSearchMovies(this.props.putSearchValue) // результат ввода в строку поиска
      .then((bodyAll) => {
        this.setState(() => ({
          body: [...bodyAll],
          loading: false,
          error: false,
          searchValue: this.props.putSearchValue,
        }));
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    const { body, loading, error } = this.state;
    const setData = !(error && loading);

    const MovieComponent = setData ? <MovieFile bodyMovie={body} /> : null;
    const SpinLoader = loading ? <Spin /> : null;
    const ErrorLoader = error ? <Alert /> : null;

    return (
      <>
        <Online>
          <section className="movie-list">
            {MovieComponent}
            {SpinLoader}
            {ErrorLoader}
          </section>
        </Online>
        <Offline>Отсутствует интернет соединение</Offline>
      </>
    );
  }
}

function MovieFile({ bodyMovie }) {
  return (
    <>
      {bodyMovie.map((elem) => (
        <Movie
          key={elem.id}
          name={elem.original_title}
          date={elem.release_date}
          desc={elem.overview}
          img={elem.poster_path}
        />
      ))}
    </>
  );
}
