import { Component } from '@angular/core';
import { TmdbService } from './services/tmdb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ChartComponent
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public chartOptions: Partial<ChartOptions> | any;

  movies: any[] = [];
  paginatedMovies : any = [];
  searchQuery = '';
  currentPage = 1;
  moviesPerPage = 4;
  totalPages = 1;
  genres: any[] = [];
  currentCategory = 'popular'; // Default category
  selectedGenre: string = '';

  constructor(private tmdbService: TmdbService, private modal: NgbModal) {
    // Example chart options for a pie chart
    this.chartOptions = {
      series: [44, 55, 13, 43, 22], // Example data
      chart: {
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const clickedGenre = this.chartOptions.labels[config.dataPointIndex];
            this.filterMoviesByGenre(clickedGenre);
          }
        }
      },
      labels: ["Action", "Drama", "Comedy", "Romance", "Sci-Fi"],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }],
      title: {
        text: "Movies by Genre"
      }
    };
  }

  ngOnInit() {
    this.loadMovies();
    this.loadGenres();
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Type cast to HTMLSelectElement
    const category = target.value;
    this.currentPage = 1; // Reset to the first page
    this.loadMovies(category);
  }

  
  onGenreChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const genreId = target.value;
    this.selectedGenre = genreId; // Assuming you have a selectedGenre property
  
    if (genreId) {
      this.tmdbService.getMoviesByGenre(genreId).subscribe({
        next: (response) => {
          this.movies = response.results;
          console.log(response.results)
          this.calculateTotalPages();
          this.updatePaginatedMovies();
        },
        error: (e) => console.error(e)
      });
    } else {
      // Optionally handle the case where no genre is selected (e.g., reset the movie list)
    }
  }
  
  updateChartData() {
    const genreCounts = new Map<string, number>();
    const genreNames: string[] = [];
    const series: number[] = [];
  
    // Loop through all movies and their genres
    this.movies.forEach(movie => {
      movie.genre_ids.forEach((genreId: number) => {
        const genreName = this.genres.find(genre => genre.id === genreId)?.name;
        if (genreName) {
          if (!genreCounts.has(genreName)) {
            genreCounts.set(genreName, 1);
          } else {
            genreCounts.set(genreName, genreCounts.get(genreName)! + 1);
          }
        }
      });
    });
  
    // Prepare data for the chart
    genreCounts.forEach((count, name) => {
      series.push(count);
      genreNames.push(name);
    });
  
    // Update the chartOptions with the new data
    this.chartOptions = {
      ...this.chartOptions, // Spread operator to keep existing settings
      series,
      labels: genreNames
    };
  }
  
  
  loadMovies(category: string = 'popular', genre: string = '') {
    this.tmdbService.getMoviesByCategory(category).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.calculateTotalPages();
        this.updatePaginatedMovies();
        this.updateChartData(); // Update chart data whenever movies are loaded
      },
      error: (e) => console.error(e)
    });
  }
  
  

  loadGenres() {
    this.tmdbService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.genres;
      },
      error: (e) => console.error(e)
    });
  }
  

  searchMovies() {
    if (this.searchQuery.length > 0) {
      this.tmdbService.searchMovies(this.searchQuery).subscribe({
        next: (response) => {
          this.movies = response.results;
          this.currentPage = 1; // Reset to first page
          this.calculateTotalPages();
          this.updatePaginatedMovies();
        },
        error: (e) => console.error(e)
      });
    } else {
      this.loadMovies(); // Reload the popular movies if the search query is cleared
    }
  }


  // Call this method whenever the movies array changes
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.movies.length / this.moviesPerPage);
  }


  updatePaginatedMovies() {
    const startIndex = (this.currentPage - 1) * this.moviesPerPage;
    this.paginatedMovies = this.movies.slice(startIndex, startIndex + this.moviesPerPage);
  }

  goToNextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
    this.updatePaginatedMovies();
  }
  
  goToPreviousPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
    this.updatePaginatedMovies();
  }
  
  selectedMovie: any = {};
  movieGenres: string = '';
  movieCast: any[] = [];
  relatedMovies: any[] = [];
  trailerUrl: string = '';

  open(content, movieId: any) {
    // Fetch movie details
    this.tmdbService.getMovieDetails(movieId).subscribe(data => {
      this.selectedMovie = data;
      this.movieGenres = data.genres.map(genre => genre.name).join(', ');
    });
  
    // Fetch movie cast
    this.tmdbService.getMovieCredits(movieId).subscribe(data => {
      this.movieCast = data.cast.slice(0, 5); // example to get top 5 cast members
    });
  
    // Fetch related movies
    this.tmdbService.getRelatedMovies(movieId).subscribe(data => {
      this.relatedMovies = data.results.slice(0, 5); // example to get 5 related movies
    });

    // Fetch movie trailer/videos
    this.tmdbService.getMovieVideos(movieId).subscribe(data => {
      const trailers = data.results.filter(video => video.site === "YouTube" && video.type === "Trailer");
      if (trailers.length > 0) {
        const trailerKey = trailers[0].key;
        this.trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
      } else {
        this.trailerUrl = ''; // No trailer found
      }
    });

    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        // Handle modal close with result
      },
      (reason) => {
        // Handle modal dismissal
      }
    );
  }

  filterMoviesByGenre(genreName: string) {
    // Assuming each movie has a genres array containing objects with a name property
    this.paginatedMovies = this.movies.filter(movie =>
      movie.genres.some(genre => genre.name === genreName)
    );
    
    // Reset pagination
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedMovies();
  }

  resetFilter() {
    this.paginatedMovies = [...this.movies]; // Reset to show all movies
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedMovies();
  }
  
}
