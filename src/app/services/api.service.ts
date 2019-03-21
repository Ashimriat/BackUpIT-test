import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL_MAIN = 'https://api.themoviedb.org/3';
  private readonly API_KEY = '?api_key=6678b4268fb63c917d179b4809db6bfd';
  private readonly API;
  constructor() {
    this.API = {
      POPULAR: (page: number) => `${this.API_URL_MAIN}/movie/popular${this.API_KEY}&page=${page}`,
      SEARCH: (request: string, page: number) => `${this.API_URL_MAIN}/search/movie${this.API_KEY}&query=${request}&page=${page}`,
      DETAILS: (movie_id: number) => `${this.API_URL_MAIN}/movie/${movie_id}${this.API_KEY}`,
      RECOMMENDED: (movie_id: number, page: number) => `${this.API_URL_MAIN}/movie/${movie_id}/recommendations${this.API_KEY}&page=${page}`,
      GENRE: () => `${this.API_URL_MAIN}/genre/movie/list${this.API_KEY}`,
    };
  }

  public async makeRequest(requestType: 'POPULAR' | 'SEARCH' | 'DETAILS' | 'RECOMMENDED' | 'GENRE', ...args) {
    const resBody = await fetch(this.API[requestType](...args));
    return await resBody.json();
  }
}
