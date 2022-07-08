import ReactDOM from 'react-dom';

import MovieService from './components/services/MoviesService';
import './components/app/app.css';
import App from './components/app';
import GenresContext from './components/genresContext';

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
