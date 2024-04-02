import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  genres: any[] = [];
  searchText: string = '';

  constructor(private tmdbService: TmdbService, private router: Router) {}

  ngOnInit(): void {
    this.tmdbService.getGenres().subscribe({
      next: (data) => {
        this.genres = data.genres;
      },
      error: (error) => console.error(error)
    });
  }

  searchMovies() {
    if (this.searchText.trim()) {
      // Navigate to the MovieListComponent with the search query
      this.router.navigate(['/movies/search'], { queryParams: { query: this.searchText.trim() } });
      this.searchText = ''; // Optionally reset the search text
    }
  }
}
