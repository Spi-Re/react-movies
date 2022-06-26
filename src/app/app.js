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
      stars: false,
      isMovie: false,
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
      this.SignInGuestSession();
    };

    // Создание сессии
    this.SignInGuestSession = () => {
      //   localStorage.clear();
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
      getGuestSession
        .rateMovies(this.id, JSON.parse(localStorage.getItem('guestId')), stars)
        .then((movie) => {
          console.log(JSON.parse(localStorage.getItem('guestId')));
          console.log(`getRate${movie}`);
          this.setState({
            stars: true,
          });
        }, 2)
        .then(() => this.ratedMovies());
    };

    // Забрать фильмы сессии
    this.ratedMovies = () => {
      if (this.state.stars) {
        getGuestSession.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId'))).then((movies) => {
          console.log(movies);
          localStorage.setItem('movies', JSON.stringify(movies));

          JSON.parse(localStorage.getItem('guestId')).length > 0
            ? this.setState({
                isMovie: true,
              })
            : this.setState({
                isMovie: false,
              });

          this.setState({
            stars: false,
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
    const { searchValue, currentPage, totalPages, sessionId, isMovie } = this.state;
    return (
      <main className="wrapper">
        <div className="common-container">
          <div>
            <Tabs defaultActiveKey="1" centered tabBarGutter="16">
              <TabPane tab="Search" key="1">
                <div className="search-container">
                  <SearchPanel getSearchValue={this.getSearchValue} />
                  <button type="button" onClick={this.clearGuestSession}>
                    Закончить сессию
                  </button>
                  {/* 
                  <button type="button" onClick={this.ratedMovies}>
                    Получить оценённые фильмы
                  </button>
                  <button type="button">Оценить фильм</button> */}
                </div>
                <MovieList
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
                        <MovieFile isMovie={isMovie} bodyMovie={JSON.parse(localStorage.getItem('movies'))} />
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

function MovieFile({ bodyMovie, isMovie }) {
  return (
    <>
      {bodyMovie.map((elem) => (
        <Movie
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
