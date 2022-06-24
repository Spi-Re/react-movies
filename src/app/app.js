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
      //   rateMovie: null,
    };

    // this.id = null;

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

    // войти
    this.SignInGuestSession = () => {
      getGuestSession.getGuestSession().then((id) => {
        console.log(id);
        localStorage.setItem('guestId', JSON.stringify(id));
        // this.id = id;
      });
    };

    // Оценить
    this.putRateMoviesToServ = () => {
      getGuestSession.rateMovies(675353, JSON.parse(localStorage.getItem('guestId'))).then((movie) => {
        console.log(JSON.parse(localStorage.getItem('guestId')));
        console.log(`getRate${movie}`);
      });
    };

    // Забрать фильмы сессии
    this.ratedMovies = () => {
      getGuestSession.getRateMoviesFromServer(JSON.parse(localStorage.getItem('guestId'))).then((movies) => {
        console.log(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
        this.setState({
          //   rateMovie: movies,
        });
      });
    };
  }

  render() {
    const { searchValue, currentPage, totalPages } = this.state;
    return (
      <main className="wrapper">
        <div className="common-container">
          <div>
            <Tabs defaultActiveKey="1" centered tabBarGutter="16">
              <TabPane tab="Search" key="1">
                <div className="search-container">
                  <SearchPanel getSearchValue={this.getSearchValue} />
                  <button type="button" onClick={this.SignInGuestSession}>
                    Войти
                  </button>
                  <button type="button" onClick={this.ratedMovies}>
                    Получить оценённые фильмы
                  </button>
                  <button type="button" onClick={this.putRateMoviesToServ}>
                    Оценить фильм
                  </button>
                </div>
                <MovieList
                  putSearchValue={searchValue}
                  putCurrentPage={currentPage}
                  getTotalPages={this.getTotalPages}
                />
                <div className="pagination-container">
                  <PaginationList
                    getCurrentPage={this.getCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </div>
              </TabPane>
              <TabPane tab="Rated" key="2">
                <div className="wrapper">
                  <div className="common-container">
                    <div className="movie-list">
                      <MovieFile bodyMovie={JSON.parse(localStorage.getItem('movies'))} />
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </main>
    );
  }
}

function MovieFile({ bodyMovie }) {
  return (
    <>
      {bodyMovie.map((elem) => (
        <Movie
          key={elem.id}
          name={elem.original_title}
          date={elem.release_date}
          desc={elem.overview}
          img={elem.poster_path}
        />
      ))}
    </>
  );
}
