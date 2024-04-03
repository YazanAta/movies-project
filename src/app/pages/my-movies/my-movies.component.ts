import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrl: './my-movies.component.scss'
})
export class MyMoviesComponent implements OnInit{
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router){}

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe(data => {
      this.movies = data
    }, error => console.log(error));
  }

  movieDescription(movieId: number | string) {
    // Use the Router to navigate to the movie details route
    // Assuming the route for movie details looks something like '/movies/:id'
    this.router.navigate(['/movie', movieId]);
  }
}
