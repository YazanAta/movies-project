package com.yazan.movies.yazan.controller;

import com.yazan.movies.yazan.entity.Movie;
import com.yazan.movies.yazan.repo.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {
  @Autowired
  private MovieRepository movieRepository;

  @PostMapping
  public Movie addMovie(@RequestBody Movie movie) {
    return movieRepository.save(movie);
  }

  @GetMapping
  public ResponseEntity<List<Movie>> getAllMovies() {
    List<Movie> movies = movieRepository.findAll();
    return ResponseEntity.ok().body(movies);
  }

}
