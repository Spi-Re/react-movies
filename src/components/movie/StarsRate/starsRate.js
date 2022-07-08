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

  handleUpdateStars = async (value) => {
    const { updateStars, putRateMoviesToServ } = this.props;
    await putRateMoviesToServ(value);
    this.setState({
      newValue: value,
    });
    updateStars();
  };

  render() {
    const { id, getMovieIdFromDOM, rating } = this.props;
    const { newValue } = this.state;
    return (
      <Rate
        allowHalf
        count="10"
        defaultValue={0}
        value={rating || newValue}
        className="rate"
        onChange={(value) => this.handleUpdateStars(value)}
        onFocus={() => getMovieIdFromDOM(id)}
      />
    );
  }
}
