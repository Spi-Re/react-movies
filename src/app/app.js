/* eslint-disable react/destructuring-assignment */
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

    this.focusMovieId = null;

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

    // забрать id фильма из элемента на котором был фокус при оценке
    this.getMovieIdFromDOM = (id) => {
      this.focusMovieId = id;
      return this.focusMovieId;
    };

    // Забрать фильмы сессии
    this.getRatedMoviesFromServer = () => {
      if (localStorage.getItem('guestId')) {
        getGuestSession.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId'))).then((movies) => {
          this.setState(() => ({
            ratedMovies: movies,
            isMovie: true,
          }));
        });
      }
    };

    this.getArrOfJenresFromServer = () => {
      getGuestSession.getJenres().then((elem) => {
        this.setState({
          arrOfGenresFromServer: elem.genres,
        });
      });
    };

    this.SignInGuestSession = () => {
      getGuestSession.getGuestSession().then((id) => {
        this.setState({
          sessionId: id,
        });
        localStorage.setItem('guestId', JSON.stringify(id));
      });
    };

    this.componentDidMount = () => {
      if (localStorage.getItem('guestId') === null) {
        this.SignInGuestSession();
      }
      this.setState({ sessionId: JSON.parse(localStorage.getItem('guestId')) });
      this.getArrOfJenresFromServer();
      this.getRatedMoviesFromServer();
    };

    // Оценить
    this.putRateMoviesToServ = (stars) => {
      if (JSON.parse(localStorage.getItem('guestId'))) {
        getGuestSession
          .rateMovies(this.focusMovieId, JSON.parse(localStorage.getItem('guestId')), stars)
          .then(() => this.getRatedMoviesFromServer());
      }
    };
  }

  render() {
    const { searchValue, currentPage, totalPages, sessionId, isMovie, arrOfGenresFromServer, ratedMovies } = this.state;

    return (
      <main className="wrapper">
        <div className="common-container">
          <div>
            <Tabs defaultActiveKey="1" centered tabBarGutter="16">
              <TabPane tab="Search" key="1">
                <div className="search-container">
                  <SearchPanel getSearchValue={this.getSearchValue} />
                </div>
                <MovieList
                  getRatedMoviesFromServer={this.getRatedMoviesFromServer}
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
