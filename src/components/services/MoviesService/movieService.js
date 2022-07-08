export default class MovieService {
  apiKey = 'c7d0196e9f7b0c30e4f5d2cc81c1d431';

  baseUrl = 'https://api.themoviedb.org/3/';

  getResource = async (url, option) => {
    try {
      const responce = await fetch(`${this.baseUrl}${url}`, option);

      if (!responce.ok) {
        throw new Error(`My Error ${url}, ne poluchilos' vszt' dannie s servera, ${responce.status}`);
      }

      const body = await responce.json();
      return body;
    } catch (err) {
      return err;
    }
  };

  async getGuestSession() {
    const result = await this.getResource(`authentication/guest_session/new?api_key=${this.apiKey}`);
    return result.guest_session_id;
  }

  rateMovies = async (movieId, guestId, stars) => {
    const result = await this.getResource(
      `movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestId}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json, charset=utf-8',
        },
        body: JSON.stringify({ value: stars }),
      }
    );

    return result.status_message;
  };

  getRateMoviesFromServer = async (guestSessionId) => {
    if (guestSessionId) {
      const result = await this.getResource(
        `guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&sort_by=created_at.asc`
      );
      return result.results;
    }
    return null;
  };

  getSearchMovies = async (name, page) => {
    let res = null;

    if (name.length > 0) {
      res = await this.getResource(`search/movie?api_key=${this.apiKey}&query=${name}&page=${page}`);
    } else {
      res = await this.getResource(`movie/popular?api_key=${this.apiKey}&page=${page}`);
      if (res.total_pages > 500) {
        res.total_pages = 500;
      }
    }

    return {
      res: res.results,
      totalPages: res.total_pages,
    };
  };

  async getJenres() {
    return this.getResource(`genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }
}
