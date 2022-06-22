import { format } from 'date-fns';
import './movie.css';
import { Component } from 'react';

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
        <div className="movie-right">
          <h2 className="movie-name">{name}</h2>
          <div className="movie-date">{(date && date.length) >= 5 ? format(new Date(date), 'PP') : 'Unknown'}</div>
          <div className="movie-all-class">
            <div className="movie-class">Action</div>
            <div className="movie-class">Drama</div>
          </div>
          <p className="movie-desc">{this.shortingText(desc, 180)}</p>
        </div>
      </div>
    );
  }
}
