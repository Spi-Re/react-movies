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

  async getSearchMovies(name, page) {
    let res = null;
    if (name.length > 0) {
      res = await this.getResource(
        `https://api.themoviedb.org/3/search/movie?api_key=c7d0196e9f7b0c30e4f5d2cc81c1d431&language=en-US&query=${name}&page=${page}&include_adult=false`
      );
    } else {
      res = await this.getResource(
        `https://api.themoviedb.org/3/movie/popular?api_key=c7d0196e9f7b0c30e4f5d2cc81c1d431&language=en-US&page=${page}`
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
