import { Component } from 'react';
import './normalize.css';
import './app.css';
import { Tabs } from 'antd';

import MovieList from '../movieList';
import SearchPanel from '../searchPanel';
import PaginationList from '../paginationList';
import MovieService from '../services/MoviesService';
import MovieFile from '../MovieFile';
import 'antd/dist/antd.css';
import '../TabsMenu/tabsMenu.css';
import '../movieList/movieList.css';

const { TabPane } = Tabs;

const getGuestSession = new MovieService();

export default class App extends Component {
  focusMovieId = null;

  constructor() {
    super();
    this.state = {
      searchValue: '',
      currentPage: 1,
      totalPages: 50,
      sessionId: false,
      isMovie: false,
      arrOfGenresFromServer: null,
      ratedMovies: null,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('guestId') === null) {
      this.SignInGuestSession();
    }
    this.setState({
      sessionId: JSON.parse(localStorage.getItem('guestId')),
    });
    this.getArrOfJenresFromServer();
    this.getRatedMoviesFromServer();
  }

  handleSearchValue = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  handleCurrentPage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleTotalPages = (totalPages) => {
    this.setState({
      totalPages,
    });
  };

  // забрать id фильма из элемента на котором был фокус при оценке
  getMovieIdFromDOM = (id) => {
    this.focusMovieId = id;
    return this.focusMovieId;
  };

  // Забрать фильмы сессии
  //   Использую local, вместо id в стейте из-за асинхронности. local доступен сразу, в отличие от state, который пишется асинхронно.
  getRatedMoviesFromServer = () => {
    const guestId = JSON.parse(localStorage.getItem('guestId'));
    if (localStorage.getItem('guestId')) {
      getGuestSession.getRateMoviesFromServer(guestId).then((movies) => {
        this.setState(() => ({
          ratedMovies: movies,
          isMovie: true,
        }));
      });
    }
  };

  getArrOfJenresFromServer = () => {
    getGuestSession.getJenres().then((elem) => {
      this.setState({
        arrOfGenresFromServer: elem.genres,
      });
    });
  };

  SignInGuestSession = () => {
    getGuestSession.getGuestSession().then((id) => {
      this.setState({
        sessionId: id,
      });
      localStorage.setItem('guestId', JSON.stringify(id));
    });
  };

  // Оценить
  putRateMoviesToServ = (stars) => {
    const { sessionId } = this.state;
    if (sessionId) {
      getGuestSession.rateMovies(this.focusMovieId, sessionId, stars).then(() => this.getRatedMoviesFromServer());
    }
  };

  render() {
    const { searchValue, currentPage, totalPages, sessionId, isMovie, arrOfGenresFromServer, ratedMovies } = this.state;

    return (
      <main className="wrapper">
        <div className="common-container">
          <div>
            <Tabs defaultActiveKey="1" centered tabBarGutter="16">
              <TabPane tab="Search" key="1">
                <div className="search-container">
                  <SearchPanel getSearchValue={this.handleSearchValue} />
                </div>
                <MovieList
                  getRatedMoviesFromServer={this.getRatedMoviesFromServer}
                  putRateMoviesToServ={this.putRateMoviesToServ}
                  putSearchValue={searchValue}
                  putCurrentPage={currentPage}
                  getTotalPages={this.handleTotalPages}
                  getMovieIdFromDOM={this.getMovieIdFromDOM}
                />
                <div className="pagination-container">
                  <PaginationList
                    getCurrentPage={this.handleCurrentPage}
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
                        <MovieFile arrOfGenresFromServer={arrOfGenresFromServer} ratedMovies={ratedMovies} />
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
