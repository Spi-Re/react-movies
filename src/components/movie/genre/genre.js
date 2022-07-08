import { Component } from 'react';
import './genre.css';

import GenresContext from '../../genresContext';

export default class Genre extends Component {
  constructor() {
    super();
    this.state = {
      name: 'aka',
    };

    this.componentDidMount = () => {
      this.jenresToString();
    };
  }

  render() {
    const { name } = this.state;
    const { genreMovieId } = this.props;
    return (
      <GenresContext.Consumer>
        {(arrOfGenres) => {
          this.jenresToString = () => {
            arrOfGenres
              .then((ids) => {
                const target = ids.genres.filter((elem) => elem.id === genreMovieId);
                return target;
              })
              .then((target) => {
                this.setState({
                  name: target[0].name,
                });
              });
          };
          return <div className="movie-class">{name}</div>;
        }}
      </GenresContext.Consumer>
    );
  }
}
