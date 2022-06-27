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
    const { putRateMoviesToServ, id, getMovieIdFromDOM, rating, updateStars } = this.props;
    const { newValue } = this.state;
    return (
      <Rate
        allowHalf
        count="10"
        defaultValue={0}
        value={rating || newValue}
        className="rate"
        onChange={async (value) => {
          await putRateMoviesToServ(value);
          this.setState({
            newValue: value,
          });
          updateStars();
        }}
        onFocus={() => getMovieIdFromDOM(id)}
      />
    );
  }
}
