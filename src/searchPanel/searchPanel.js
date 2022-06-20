/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import './searchPanel.css';
import { Component } from 'react';
import { debounce } from 'lodash';

export default class SearchPanel extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { getSearchValue } = this.props;

    return (
      <input
        className="search-panel"
        type="text"
        placeholder="Type to search..."
        onKeyUp={(e) => {
          const count = debounce(() => getSearchValue(e.target.value), 1000);

          if (e.target.value.trim() !== '') {
            count();
          }
        }}
      />
    );
  }
}
