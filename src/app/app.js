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
      searchValue: 'return',
    };

    this.getSearchValue = (value) => {
      this.setState({
        searchValue: value,
      });
    };
  }

  render() {
    const { searchValue } = this.state;
    return (
      <main className="wrapper">
        <div className="common-container">
          <div className="search-container">
            <SearchPanel getSearchValue={this.getSearchValue} />
          </div>
          <MovieList putSearchValue={searchValue} />
          <div className="pagination-container">
            <PaginationList />
          </div>
        </div>
      </main>
    );
  }
}
