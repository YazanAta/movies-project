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
  
  getMoviesByGenre(genreId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }  

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`);
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
  
  
}
