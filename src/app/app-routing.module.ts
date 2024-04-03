import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './shared/movie-list/movie-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movies/:filter', component: MovieListComponent },
  { path: 'genre/:genreId', component: MovieListComponent },
  { path: 'movies/search', component: MovieListComponent },
  { path: 'mymovies', component: MyMoviesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
