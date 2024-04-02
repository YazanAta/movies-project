import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  searchText: string = '';

  constructor(private tmdbService: TmdbService, private router: Router) {}

  ngOnInit() {
    this.tmdbService.getFeaturedMovies().subscribe(response => {
      this.movies = response.results;
    });
  }

  movieDescription(movieId: number | string) {
    // Use the Router to navigate to the movie details route
    // Assuming the route for movie details looks something like '/movies/:id'
    this.router.navigate(['/movie', movieId]);
  }

  searchMovies() {
    if (this.searchText.trim()) {
      // Navigate to the MovieListComponent with the search query
      this.router.navigate(['/movies/search'], { queryParams: { query: this.searchText.trim() } });
      this.searchText = ''; // Optionally reset the search text
    }
  }
}
