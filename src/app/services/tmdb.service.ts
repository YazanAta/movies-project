import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private apiKey: string = environment.tmdbApiKey;

  constructor(private http: HttpClient) { }
  
  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }
  
  getMoviesByGenre(genreId: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }  

  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
    return this.http.get(url);
  }

  getMoviesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${category}?api_key=${this.apiKey}`);
  }
  
  getMovieDetails(movieId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }
  
  getMovieCredits(movieId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }
  
  getRelatedMovies(movieId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}`);
  }

  getMovieVideos(movieId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`);
  }

  getMovies(filter: string = 'popular', page: number = 1, genreId?: number): Observable<any> {
    let url = `${this.baseUrl}/movie/${filter}?api_key=${this.apiKey}&page=${page}`;
    if (genreId) {
      url = `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}&page=${page}`;
    }
    return this.http.get(url);
  }

  getFeaturedMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}`);
  }  
  
  
  
}
