import './normalize.css';
import './app.css';
import { Component } from 'react';

import MovieList from '../movieList';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <main className="wrapper">
        <MovieList />
      </main>
    );
  }
}

// adult: false
// backdrop_path: "/4QLdZ2A8mkDWp2rpfgDrwmeCtUW.jpg"
// genre_ids: (3) [28, 12, 80]
// id: 47971
// original_language: "en"
// original_title: "xXx: Return of Xander Cage"
// overview: "Extreme athlete turned government operative Xander Cage comes out of self-imposed exile, thought to be long dead, and is set on a collision course with deadly alpha warrior Xiang and his team in a race to recover a sinister and seemingly unstoppable weapon known as Pandora's Box. Recruiting an all-new group of thrill-seeking cohorts, Xander finds himself enmeshed in a deadly conspiracy that points to collusion at the highest levels of world governments."
// popularity: 100.184
// poster_path: "/hba8zREJpP1AYhaXgb2oJLQeO0K.jpg"
// release_date: "2017-01-13"
// title: "xXx: Return of Xander Cage"
// video: false
// vote_average: 5.9
// vote_count: 5966
