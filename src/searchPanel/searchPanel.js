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
          const debounceGetSearchValue = debounce(() => {
            getSearchValue(e.target.value);
          }, 800);

          if (e.target.value.trim() !== '' && e.target.value.length > 0) {
            debounceGetSearchValue();
          }
        }}
      />
    );
  }
}
