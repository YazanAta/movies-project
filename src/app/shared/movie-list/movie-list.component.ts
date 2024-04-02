import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnChanges {
  @Input() filter: string = 'popular';
  @Input() genreId?: number;
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  loading: boolean = false;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    // Using combineLatest to react to changes in both paramMap and queryParams
    this.route.paramMap.subscribe(params => {
      const filter = params.get('filter') || this.filter;
      const genreId = params.get('genreId');
      this.route.queryParams.subscribe(queryParams => {
        const searchQuery = queryParams['query'];
        if (searchQuery) {
          this.searchMovies(searchQuery);
        } else if (filter || genreId) {
          this.loadMovies({ filter, genreId: genreId ? +genreId : undefined });
        } else {
          this.loadMovies({});
        }
      });
    });
  }


  

  ngOnChanges(changes: SimpleChanges) {
    // Access properties using bracket notation
    const filterChange = changes['filter'];
    const genreIdChange = changes['genreId'];
  
    // Check if the properties exist and have a current value
    if (filterChange && filterChange.currentValue) {
      this.loadMovies({ filter: filterChange.currentValue, page: 1 });
    } else if (genreIdChange && genreIdChange.currentValue) {
      this.loadMovies({ genreId: genreIdChange.currentValue, page: 1 });
    }
  }
  

  loadMovies(options: { filter?: string, genreId?: any, page?: number } = {}): void {
    this.loading = true;
    const { filter = 'popular', genreId, page = 1 } = options;
  
    const observable = genreId ? 
      this.tmdbService.getMoviesByGenre(genreId, page) : 
      this.tmdbService.getMovies(filter, page);
  
    observable.subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
        this.currentPage = page;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.loading = false;
      }
    });
  }
  

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadMovies({ filter: this.filter, genreId: this.genreId, page: this.currentPage + 1 });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.loadMovies({ filter: this.filter, genreId: this.genreId, page: this.currentPage - 1 });
    }
  }

  searchMovies(query: string): void {
    this.loading = true;
  
    this.tmdbService.searchMovies(query).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
        this.currentPage = 1;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching movies:', error);
        this.loading = false;
      }
    });
  }
  
  movieDescription(movieId: number | string) {
    // Use the Router to navigate to the movie details route
    // Assuming the route for movie details looks something like '/movies/:id'
    this.router.navigate(['/movie', movieId]);
  }
  
  
}
