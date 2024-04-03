package com.yazan.movies.yazan.repo;

import com.yazan.movies.yazan.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long>{
}
