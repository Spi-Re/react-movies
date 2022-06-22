import { Component } from 'react';
import './normalize.css';
import './app.css';

import MovieList from '../movieList';
import SearchPanel from '../searchPanel';
import PaginationList from '../paginationList';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      currentPage: 1,
      totalPages: 50,
    };

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
  }

  render() {
    const { searchValue, currentPage, totalPages } = this.state;
    return (
      <main className="wrapper">
        <div className="common-container">
          <div className="search-container">
            <SearchPanel getSearchValue={this.getSearchValue} />
          </div>
          <MovieList putSearchValue={searchValue} putCurrentPage={currentPage} getTotalPages={this.getTotalPages} />
          <div className="pagination-container">
            <PaginationList getCurrentPage={this.getCurrentPage} currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </main>
    );
  }
}
