import { Component } from 'react';
import './normalize.css';
import './app.css';
import { Tabs } from 'antd';

import MovieList from '../movieList';
import SearchPanel from '../searchPanel';
import PaginationList from '../paginationList';
import MovieService from '../services/MoviesService';
import Movie from '../movie';

import 'antd/dist/antd.css';
import '../TabsMenu/tabsMenu.css';
import '../movieList/movieList.css';

const { TabPane } = Tabs;

const getGuestSession = new MovieService();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      currentPage: 1,
      totalPages: 50,
      sessionId: false,
      isMovie: false,
      arrOfGenresFromServer: null,
    };

    this.id = null;

    this.getSearchValue = (value) => {
      this.setState({
        searchValue: value,
      });
    };

    this.getCurrentPage = (page) => {
      this.setState({
        currentPage: page,
      });
    };

    this.getTotalPages = (totalPages) => {
      this.setState({
        totalPages,
      });
    };

    // чисто для второго таба, потому что эта же функция дублируется в компоненте movieList
    this.downloadArrOfJenresFromServer = () => {
      getGuestSession.getJenres().then((elem) => {
        this.setState({
          arrOfGenresFromServer: elem.genres,
        });
      });
    };

    this.componentDidMount = () => {
      // this.downloadArrOfJenresFromServer();
      if (localStorage.getItem('guestId') === null) {
        this.SignInGuestSession();
      }
      this.setState({ sessionId: JSON.parse(localStorage.getItem('guestId')) });
      this.downloadArrOfJenresFromServer();
      this.ratedMovies();
    };

    // Создание новой сессии
    this.SignInGuestSession = () => {
      this.clearGuestSession();
      getGuestSession.getGuestSession().then((id) => {
        this.setState({
          sessionId: id,
        });
        localStorage.setItem('guestId', JSON.stringify(id));
      });
    };

    this.clearGuestSession = () => {
      localStorage.clear();
      this.setState({
        sessionId: null,
      });
    };

    // Оценить
    this.putRateMoviesToServ = (stars) => {
      if (JSON.parse(localStorage.getItem('guestId'))) {
        getGuestSession
          .rateMovies(this.id, JSON.parse(localStorage.getItem('guestId')), stars)
          .then(() => this.ratedMovies());
      }
    };

    // Забрать фильмы сессии
    this.ratedMovies = () => {
      if (localStorage.getItem('guestId')) {
        getGuestSession.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId'))).then((movies) => {
          // установить фильмы с сервера в локал сторедж
          localStorage.setItem('movies', JSON.stringify(movies));
          this.setState({ isMovie: true });
        });
      }
    };

    // забрать id фильма из элемента на котором был фокус при оценке
    this.getMovieIdFromDOM = (id) => {
      this.id = id;
      return this.id;
    };
  }

  render() {
    const { searchValue, currentPage, totalPages, sessionId, isMovie, arrOfGenresFromServer } = this.state;
    return (
      <main className="wrapper">
        <div className="common-container">
          <div>
            <Tabs defaultActiveKey="1" centered tabBarGutter="16">
              <TabPane tab="Search" key="1">
                <div className="search-container">
                  <SearchPanel getSearchValue={this.getSearchValue} />

                  <button type="button" onClick={this.SignInGuestSession}>
                    Начать новую сессию
                  </button>
                </div>
                <MovieList
                  arrOfGenresFromServer={arrOfGenresFromServer}
                  ratedMovies={this.ratedMovies}
                  putRateMoviesToServ={this.putRateMoviesToServ}
                  putSearchValue={searchValue}
                  putCurrentPage={currentPage}
                  getTotalPages={this.getTotalPages}
                  getMovieIdFromDOM={this.getMovieIdFromDOM}
                />
                <div className="pagination-container">
                  <PaginationList
                    getCurrentPage={this.getCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              </TabPane>
              {sessionId && isMovie ? (
                <TabPane tab="Rated" key="2">
                  <div className="wrapper">
                    <div className="common-container">
                      <div className="movie-list">
                        <MovieFile
                          arrOfGenresFromServer={arrOfGenresFromServer}
                          bodyMovie={JSON.parse(localStorage.getItem('movies'))}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
              ) : (
                <TabPane tab="Rated" key="2">
                  <div className="wrapper">
                    <div className="common-container">
                      <div className="movie-list" />
                    </div>
                  </div>
                </TabPane>
              )}
            </Tabs>
          </div>
        </div>
      </main>
    );
  }
}

function MovieFile({ bodyMovie, arrOfGenresFromServer }) {
  return (
    <>
      {bodyMovie.map((elem) => (
        <Movie
          arrOfGenresFromServer={arrOfGenresFromServer}
          genresMovieId={elem.genre_ids}
          vote={elem.vote_average}
          id={elem.id}
          name={elem.original_title}
          date={elem.release_date}
          desc={elem.overview}
          img={elem.poster_path}
          key={elem.id}
        />
      ))}
    </>
  );
}
