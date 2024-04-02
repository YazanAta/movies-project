import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './shared/movie-list/movie-list.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movies/:filter', component: MovieListComponent },
  { path: 'genre/:genreId', component: MovieListComponent },
  { path: 'movies/search', component: MovieListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
