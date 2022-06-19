import { format } from 'date-fns';
import './movie.css';
import { Component } from 'react';

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
  }

  render() {
    const { name, desc, img, date } = this.state;
    return (
      <div className="movie-card">
        <div className="poster-wrap">
          <img
            className="movie-poster"
            src={img ? `https://image.tmdb.org/t/p/w500${img}` : './zaglushka.jpg'}
            alt="Poster"
          />
        </div>
        <div className="movie-right">
          <h2 className="movie-name">{name}</h2>
          <div className="movie-date">{date.length >= 5 ? format(new Date(date), 'PP') : 'Unknown'}</div>
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
