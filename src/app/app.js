/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { Component } from 'react';
import './normalize.css';
import './app.css';
import { Tabs } from 'antd';
import { parse } from 'date-fns';

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
      hasRaited: false,
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

    this.componentDidMount = () => {
      // this.SignInGuestSession();
      this.ratedMovies();

      JSON.parse(localStorage.getItem('guestId')) && JSON.parse(localStorage.getItem('guestId')).length > 0
        ? this.setState({
            sessionId: JSON.parse(localStorage.getItem('guestId')),
          })
        : this.setState({
            sessionId: false,
          });
    };

    // Создание новой сессии
    this.SignInGuestSession = () => {
      this.clearGuestSession();
      getGuestSession.getGuestSession().then((id) => {
        console.log(id);
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
          .then((movie) => {
            console.log(JSON.parse(localStorage.getItem('guestId')));
            console.log(`getRate${movie}`);
          }, 2)
          .then(() => this.ratedMovies());
      }
    };

    // ================================== Фукнции для второго таба

    this.putRateMoviesToTabTwo = async (stars, id) => {
      await getGuestSession.rateMovies(this.id, JSON.parse(localStorage.getItem('guestId')), stars);
      const result = await getGuestSession.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId')));

      let movie = result.filter((elem) => elem.id === id);
      console.log(movie);
      let value = movie[0].rating || 0;
      this.setState({
        hasRaited: true,
      });
      return value;
    };

    // ======================================

    // Забрать фильмы сессии
    this.ratedMovies = () => {
      if (localStorage.getItem('guestId')) {
        getGuestSession.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId'))).then((movies) => {
          console.log(movies);

          // установить фильмы с сервера в локал сторедж
          localStorage.setItem('movies', JSON.stringify(movies));

          JSON.parse(localStorage.getItem('guestId')).length > 0
            ? this.setState({
                isMovie: true,
              })
            : this.setState({
                isMovie: false,
              });
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
    const { searchValue, currentPage, totalPages, sessionId, isMovie, hasRaited } = this.state;
    return (
      <main className="wrapper">
        <div className="common-container">
          <div>
            <Tabs defaultActiveKey="1" centered tabBarGutter="16">
              <TabPane tab="Search" key="1">
                <div className="search-container">
                  <SearchPanel getSearchValue={this.getSearchValue} />
                  {/* <button type="button" onClick={this.clearGuestSession}>
                    Закончить сессию
                  </button> */}

                  <button type="button" onClick={this.SignInGuestSession}>
                    Начать новую сессию
                  </button>
                  {/* <button type="button">Оценить фильм</button> */}
                </div>
                <MovieList
                  putRateMoviesToTabTwo={this.putRateMoviesToTabTwo}
                  ratedMovies={this.ratedMovies}
                  sessionId={sessionId}
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
                          sessionId={sessionId}
                          isMovie={isMovie}
                          hasRaited={hasRaited}
                          bodyMovie={JSON.parse(localStorage.getItem('movies'))}
                          putRateMoviesToTabTwo={this.putRateMoviesToTabTwo}
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

function MovieFile({ bodyMovie, isMovie, putRateMoviesToTabTwo, hasRaited, sessionId }) {
  return (
    <>
      {bodyMovie.map((elem) => (
        <Movie
          sessionId={sessionId}
          hasRaited={hasRaited}
          putRateMoviesToTabTwo={putRateMoviesToTabTwo}
          vote={elem.vote_average}
          isMovie={isMovie}
          key={elem.id}
          name={elem.original_title}
          date={elem.release_date}
          desc={elem.overview}
          img={elem.poster_path}
          id={elem.id}
        />
      ))}
    </>
  );
}
