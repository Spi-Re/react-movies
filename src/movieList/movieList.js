import { Component } from 'react';

import Movie from '../movie';
import './movieList.css';
import MovieService from '../services/MoviesService';

export default class MovieList extends Component {
  service = new MovieService();

  constructor() {
    super();
    this.state = {
      body: [],
    };
    this.updateMovies();
  }

  updateMovies() {
    this.service.getSearchMovies('return').then((bodyAll) => {
      this.setState(() => ({
        body: [...bodyAll],
      }));
    });
  }

  render() {
    const { body } = this.state;
    return (
      <section className="movie-list">
        {body.map((elem) => (
          <Movie
            key={elem.id}
            name={elem.original_title}
            date={elem.release_date}
            desc={elem.overview}
            img={elem.poster_path}
          />
        ))}
      </section>
    );
  }
}
