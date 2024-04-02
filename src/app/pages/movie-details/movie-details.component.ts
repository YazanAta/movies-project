import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit{
  movie: any = {};
  trailerUrl: string = '';
  cast: any[] = [];
  relatedMovies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const movieId = params.get('id');
        return this.tmdbService.getMovieDetails(movieId);
      })
    ).subscribe(movieDetails => {
      this.movie = movieDetails;
      this.fetchAdditionalMovieDetails(movieDetails.id);
    });
  }

  fetchAdditionalMovieDetails(movieId: string): void {
    this.tmdbService.getMovieVideos(movieId).subscribe(videos => {
      const trailer = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    });

    this.tmdbService.getMovieCredits(movieId).subscribe(credits => {
      this.cast = credits.cast.slice(0, 5); // Adjust number as needed
    });

    this.tmdbService.getRelatedMovies(movieId).subscribe(related => {
      this.relatedMovies = related.results.slice(0, 8); // Adjust number as needed
    });
  }

  navigateToMovieDetails(movieId: number | string) {
    this.router.navigate(['/movie', movieId]);
  }

}

