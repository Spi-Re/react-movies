const apiKey = 'c7d0196e9f7b0c30e4f5d2cc81c1d431';

export default class MovieService {
  async getResource(url) {
    try {
      const responce = await fetch(url);

      if (!responce.ok) {
        throw new Error(`My Error ${this.url}, ne poluchilos' vszt' dannie s servera, ${responce.status}`);
      }

      const body = await responce.json();
      return body;
    } catch (err) {
      return err;
    }
  }

  //   войти
  async getGuestSession() {
    const result = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`
    );
    return result.guest_session_id;
  }

  //   POST запрос на сервер на оценку фильма
  // eslint-disable-next-line class-methods-use-this
  async postResourse(url) {
    const responce = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ value: 8 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = responce.json();
    return result;
  }

  //   Доп функция для POST запроса
  async rateMovies(movieId, guestId) {
    const result = await this.postResourse(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestId}`
    );
    console.log(`статус код метода по ценке фильмов ${result.status_message}`);
    return result.status_message;
  }

  async getRateMoviesFromServer(guestSessionId) {
    const result = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc`
    );
    return result.results;
  }

  async getSearchMovies(name, page) {
    let res = null;
    if (name.length > 0) {
      res = await this.getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${name}&page=${page}&include_adult=false`
      );
    } else {
      res = await this.getResource(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      if (res.total_pages > 500) {
        res.total_pages = 500;
      }
    }
    return {
      res: res.results,
      totalPages: res.total_pages,
    };
  }
}
