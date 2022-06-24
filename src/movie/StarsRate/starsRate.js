/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import { Rate } from 'antd';

import 'antd/dist/antd.css';
import './star-rate.css';

export default class StarsRate extends Component {
  constructor() {
    super();
    this.state = {
      newValue: 0,
    };
  }

  render() {
    const { putRateMoviesToServ, id, getMovieIdFromDOM, ratedMovies } = this.props;
    const { newValue } = this.state;
    return (
      <Rate
        allowHalf
        count="10"
        defaultValue={0}
        value={newValue}
        className="rate"
        onChange={(value) => {
          this.setState({
            newValue: value,
          });
          putRateMoviesToServ(value);
          ratedMovies();
        }}
        onFocus={() => getMovieIdFromDOM(id)}
      />
    );
  }
}
