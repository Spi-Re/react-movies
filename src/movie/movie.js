/* eslint-disable react/destructuring-assignment */
import { format } from 'date-fns';
import './movie.css';
import { Component } from 'react';

import MovieService from '../services/MoviesService';

import Genre from './genre';
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

  componentDidMount() {
    this.updateStars();
  }

  componentDidUpdate(prevProps, prevState) {
    const { rating } = this.state;
    if (prevState.rating !== rating) {
      this.updateStars();
    }
  }

  render() {
    const { name, desc, img, date, id, vote, rating } = this.state;
    const { getMovieIdFromDOM, putRateMoviesToServ, genresMovieId, arrOfGenresFromServer } = this.props;

    const shortingTextSize = () => {
      if (this.windowOuterWidth < 350) {
        return this.shortingText(desc, 120);
      }
      if (this.windowOuterWidth < 720) {
        return this.shortingText(desc, 165);
      }
      if (this.windowOuterWidth < 950) {
        return desc;
      }
      if (this.windowOuterWidth > 950 && name.length > 30) {
        return this.shortingText(desc, 120);
      }
      return this.shortingText(desc, 170);
    };
    let borderColor = null;

    if (vote > 7) {
      borderColor = '2px solid #66E900';
    } else if (vote > 5) {
      borderColor = '2px solid #E9D100';
    } else if (vote > 3) {
      borderColor = '2px solid #E97E00';
    } else {
      borderColor = '2px solid #E90000';
    }

    const styleEllipse = {
      border: borderColor,
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
            {genresMovieId.map((elem) => (
              <Genre key={elem} genreMovieId={elem} arrOfGenresFromServer={arrOfGenresFromServer} />
            ))}
          </div>
          <div className="movie-stars-rate">
            <StarsRate
              updateStars={this.updateStars}
              rating={rating}
              putRateMoviesToServ={putRateMoviesToServ}
              id={id}
              getMovieIdFromDOM={getMovieIdFromDOM}
            />
          </div>
          <p className="movie-desc">{shortingTextSize()}</p>
        </div>
      </div>
    );
  }
}
