/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import { format } from 'date-fns';
import './movie.css';
import { Component } from 'react';

import StarsRate from './StarsRate';
import Zaglushka from './zaglushka.jpg';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    const { name, date, desc, img } = this.props;
    this.state = {
      name,
      date,
      desc,
      img,
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
  }

  render() {
    const { name, desc, img, date } = this.state;
    return (
      <div className="movie-card">
        <div className="poster-wrap">
          <img className="movie-poster" src={img ? `https://image.tmdb.org/t/p/w500${img}` : Zaglushka} alt="Poster" />
        </div>
        <div className="number-rate">6.6</div>
        <div className="movie-right">
          <h2 className="movie-name">{this.windowOuterWidth < 500 ? this.shortingText(name, 35) : name}</h2>
          <div className="movie-date">{(date && date.length) >= 5 ? format(new Date(date), 'PP') : 'Unknown'}</div>
          <div className="movie-all-class">
            <div className="movie-class">Action</div>
            <div className="movie-class">Drama</div>
          </div>
          <div className="movie-stars-rate">
            <StarsRate />
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
