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
import { Router } from '@angular/router';

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

  constructor(private tmdbService: TmdbService, private modal: NgbModal, private router: Router) {
    // Example chart options for a pie chart
    this.chartOptions = {
      series: [44, 55, 13, 43, 22], // Example data
      chart: {
        type: "pie",
        events: {
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

}
