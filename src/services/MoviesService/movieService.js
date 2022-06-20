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

  async getSearchMovies(name = 'harry') {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=c7d0196e9f7b0c30e4f5d2cc81c1d431&language=en-US&query=${name}&page=1-5&include_adult=false`
    );

    return res.results;
  }
}
