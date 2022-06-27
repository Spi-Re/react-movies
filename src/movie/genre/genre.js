import { Component } from 'react';
import './genre.css';

export default class Genre extends Component {
  constructor() {
    super();
    this.state = {
      name: 'aka',
    };

    this.componentDidMount = () => {
      this.jenresToString();
    };

    this.jenresToString = () => {
      const { genreMovieId, arrOfGenresFromServer } = this.props;
      const stringNameOfGenre = arrOfGenresFromServer.filter((elem) => elem.id === genreMovieId);
      const nameOfGenre = stringNameOfGenre[0].name;
      this.setState({
        name: nameOfGenre,
      });
      //   return stringNameOfJenre.name;
    };
  }

  render() {
    const { name } = this.state;
    return <div className="movie-class">{name}</div>;
  }
}
