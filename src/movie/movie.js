import { format } from 'date-fns';
import './movie.css';
import { Component } from 'react';

import MoviesService from '../services/MoviesService';

export default class Movie extends Component {
  service = new MoviesService();

  constructor() {
    super();
    this.state = {
      name: null,
      date: null,
      desc: null,
      img: null,
    };

    this.updateMovies();
  }

  updateMovies() {
    this.service.getSearchMovies('return').then((body) => {
      this.setState({
        name: body[0].original_title,
        date: body[0].release_date,
        desc: body[0].overview,
        img: body[0].poster_path,
      });
    });
  }

  render() {
    const { name, desc, img, date } = this.state;
    return (
      <div className="movie-card">
        <div className="poster-wrap">
          <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${img}`} alt="Poster" />
        </div>
        <div className="movie-right">
          <h2 className="movie-name">{name}</h2>
          <div className="movie-date">{format(new Date(date), 'PP')}</div>
          <div className="movie-all-class">
            <div className="movie-class">Action</div>
            <div className="movie-class">Drama</div>
          </div>
          <p className="movie-desc">{desc}</p>
        </div>
      </div>
    );
  }
}
