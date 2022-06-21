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
        onChange={(e) => {
          e.stopPropagation();
          const debounceGetSearchValue = debounce(() => {
            // console.log(`запрос из searchPanel ${e.target.value}`);
            getSearchValue(e.target.value);
          }, 500);

          if (e.target.value.trim() !== '' && e.target.value.length > 0) {
            debounceGetSearchValue();
          }
        }}
      />
    );
  }
}
