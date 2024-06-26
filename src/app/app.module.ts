import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './shared/movie-list/movie-list.component';
import { NavComponent } from './pages/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { TmdbService } from './services/tmdb.service';
import { MovieService } from './services/movie.service';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe,
    MovieDetailsComponent,
    MovieListComponent,
    NavComponent,
    HomeComponent,
    MyMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    TmdbService,
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
