import { Component } from 'react';

import Movie from '../movie';
import './movieList.css';

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className="movie-list">
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </section>
    );
  }
}
