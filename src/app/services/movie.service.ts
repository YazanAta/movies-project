import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) { }

  addMovie(movie: any) {
    return this.http.post(this.apiUrl, movie);
  }

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

}
