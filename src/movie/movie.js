/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { format } from 'date-fns';
import './movie.css';
import { Component } from 'react';

import MovieService from '../services/MoviesService';

import StarsRate from './StarsRate';
import Zaglushka from './zaglushka.jpg';

const getStarsOfMovie = new MovieService();

export default class Movie extends Component {
  constructor(props) {
    super(props);
    const { name, date, desc, img, id, vote } = this.props;
    this.state = {
      name,
      date,
      desc,
      img,
      id,
      vote,
      rating: null,
    };
    this.windowOuterWidth = window.outerWidth;
    this.shortingText = (texts, limit) => {
      let text = texts.trim();
      if (text.length <= limit) return text;
      text = text.slice(0, limit);
      const lastSpace = text.lastIndexOf(' ');
      if (lastSpace > 0) {
        text = text.slice(0, lastSpace);
        return `${text}...`;
      }
      return text;
    };

    this.updateStars = async () => {
      if (localStorage.getItem('guestId')) {
        let stars = null;

        const arrOfMovies = await getStarsOfMovie.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId')));
        const targetMovie = arrOfMovies.filter((elem) => elem.id === id);
        stars = targetMovie.length > 0 ? targetMovie[0].rating : 0;
        this.setState({
          rating: stars,
        });
      }
    };
  }

  // получает рейтинг фильма после перезагрузки страницы
  componentDidMount() {
    this.updateStars();
  }

  render() {
    const { name, desc, img, date, id, vote, rating } = this.state;
    const {
      getMovieIdFromDOM,
      putRateMoviesToServ,
      sessionId,
      ratedMovies,
      isMovie,
      putRateMoviesToTabTwo,
      hasRaited,
    } = this.props;
    const styleEllipse = {
      border:
        vote > 7
          ? '2px solid #66E900'
          : vote > 5
          ? '2px solid #E9D100'
          : vote > 3
          ? '2px solid #E97E00'
          : '2px solid #E90000',
    };
    return (
      <div className="movie-card">
        <div className="poster-wrap">
          <img className="movie-poster" src={img ? `https://image.tmdb.org/t/p/w500${img}` : Zaglushka} alt="Poster" />
        </div>
        <div className="number-rate" style={styleEllipse}>
          {String(vote).length === 1 ? `${vote}.0` : vote}
        </div>
        <div className="movie-right">
          <h2 className="movie-name">{this.windowOuterWidth < 500 ? this.shortingText(name, 35) : name}</h2>
          <div className="movie-date">{(date && date.length) >= 5 ? format(new Date(date), 'PP') : 'Unknown'}</div>
          <div className="movie-all-class">
            <div className="movie-class">Action</div>
            <div className="movie-class">Drama</div>
          </div>
          <div className="movie-stars-rate">
            <StarsRate
              updateStars={this.updateStars}
              rating={rating}
              hasRaited={hasRaited}
              putRateMoviesToTabTwo={putRateMoviesToTabTwo}
              putRateMoviesToServ={putRateMoviesToServ}
              id={id}
              isMovie={isMovie}
              getMovieIdFromDOM={getMovieIdFromDOM}
              sessionId={sessionId}
              ratedMovies={ratedMovies}
            />
          </div>
          <p className="movie-desc">
            {this.windowOuterWidth < 720
              ? this.shortingText(desc, 165)
              : this.windowOuterWidth < 950
              ? desc
              : this.windowOuterWidth > 950 && name.length > 30
              ? this.shortingText(desc, 120)
              : this.shortingText(desc, 170)}
          </p>
        </div>
      </div>
    );
  }
}
