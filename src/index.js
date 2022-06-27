import ReactDOM from 'react-dom';

import MovieService from './services/MoviesService';
import './app/app.css';
import App from './app';
import GenresContext from './genresContext';

const service = new MovieService();

const getGenres = async () => service.getJenres();

function render() {
  ReactDOM.render(
    <GenresContext.Provider value={getGenres()}>
      <App />
    </GenresContext.Provider>,
    document.getElementById('root')
  );
}

render();
