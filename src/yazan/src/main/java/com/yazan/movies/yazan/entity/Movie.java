package com.yazan.movies.yazan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Movie {
  @Id
  private Long id;
  private String title;

  @Column(length = 10000) // Or simply remove the length attribute if using TEXT or LONGTEXT
  private String overview;
  // Add other fields as necessary

  // Constructors
  public Movie() {}

  // Getters and Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getOverview() { return overview; }
  public void setOverview(String overview) { this.overview = overview; }
  // Constructors, getters, and setters
}
